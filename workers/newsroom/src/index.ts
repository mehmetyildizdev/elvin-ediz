export interface Env {
  NEWS_CACHE: KVNamespace;
  SANITY_PROJECT_ID: string;
  SANITY_DATASET: string;
  SANITY_WRITE_TOKEN: string;
  AI_API_KEY: string;
  AI_API_URL?: string;
  AI_MODEL?: string;
  APPOINTMENT_WEBHOOK_URL?: string;
  ALLOWED_ORIGINS?: string;
}
type Story = {
  id: string;
  title: string;
  link: string;
  source?: string;
  publishedAt?: string;
};

const cors = (env: Env, origin: string) => ({
  'access-control-allow-origin': (env.ALLOWED_ORIGINS || '')
    .split(',')
    .map((item) => item.trim())
    .includes(origin)
    ? origin
    : '',
  'access-control-allow-methods': 'GET, POST, OPTIONS',
  'access-control-allow-headers': 'content-type',
});
const response = (env: Env, origin: string, data: unknown, status = 200) =>
  Response.json(data, { status, headers: cors(env, origin) });
const escape = (value: string) =>
  value
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .trim();

async function refreshNews(env: Env) {
  const rss = await fetch(
    'https://news.google.com/rss/search?q=Canada+immigration&hl=en-CA&gl=CA&ceid=CA:en'
  ).then((result) => result.text());
  const stories: Story[] = [
    ...rss.matchAll(
      /<item>[\s\S]*?<title><!\[CDATA\[(.*?)\]\]><\/title>[\s\S]*?<link>(.*?)<\/link>[\s\S]*?<pubDate>(.*?)<\/pubDate>/g
    ),
  ]
    .slice(0, 20)
    .map(([, title, link, publishedAt]) => {
      const [headline, source] = title.split(/\s+-\s+(?=[^-]+$)/);
      return {
        id: crypto.randomUUID(),
        title: escape(headline),
        source: escape(source || 'Google News'),
        link: escape(link),
        publishedAt,
      };
    });
  await env.NEWS_CACHE.put(
    'canada-immigration',
    JSON.stringify({ refreshedAt: new Date().toISOString(), stories }),
    { expirationTtl: 172800 }
  );
  return stories;
}

function prompt(story: Story) {
  return `You write calm, accurate updates for a Regulated Canadian Immigration Consultant. Using only this supplied headline and source URL, return strict JSON: {"title":"...","excerpt":"...","paragraphs":["...","..."]}. Do not make legal claims, invent program rules, dates, or eligibility. Do not imply outcomes are guaranteed. Never state facts that are not supported by the source. Write a concise, neutral draft and end with a sentence encouraging readers to confirm details through official IRCC sources or seek advice tailored to their circumstances. Source: ${JSON.stringify(story)}`;
}

async function createSanityDraft(env: Env, story: Story) {
  const ai = await fetch(env.AI_API_URL || 'https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${env.AI_API_KEY}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: env.AI_MODEL || 'gpt-4.1-mini',
      response_format: { type: 'json_object' },
      temperature: 0.2,
      messages: [{ role: 'user', content: prompt(story) }],
    }),
  });
  if (!ai.ok) throw new Error(`AI provider returned ${ai.status}`);
  const result = (await ai.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const draft = JSON.parse(result.choices?.[0]?.message?.content || '{}') as {
    title?: string;
    excerpt?: string;
    paragraphs?: string[];
  };
  if (
    !draft.title ||
    !draft.excerpt ||
    !Array.isArray(draft.paragraphs) ||
    draft.paragraphs.length === 0
  )
    throw new Error('AI did not return a valid post draft');
  const id = `drafts.post-${crypto.randomUUID()}`;
  const content = draft.paragraphs.map((text) => ({
    _type: 'block',
    _key: crypto.randomUUID(),
    style: 'normal',
    markDefs: [],
    children: [{ _type: 'span', _key: crypto.randomUUID(), marks: [], text }],
  }));
  const mutation = {
    mutations: [
      {
        create: {
          _id: id,
          _type: 'post',
          title: draft.title,
          kind: 'news',
          excerpt: draft.excerpt,
          content,
          sourceURL: story.link,
          publishedAt: new Date().toISOString(),
        },
      },
    ],
  };
  const sanity = await fetch(
    `https://${env.SANITY_PROJECT_ID}.api.sanity.io/v2025-02-19/data/mutate/${env.SANITY_DATASET}`,
    {
      method: 'POST',
      headers: {
        authorization: `Bearer ${env.SANITY_WRITE_TOKEN}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify(mutation),
    }
  );
  if (!sanity.ok) throw new Error(`Sanity returned ${sanity.status}`);
  return id.replace('drafts.', '');
}

async function createAppointment(env: Env, appointment: Record<string, unknown>) {
  const id = `appointment-${crypto.randomUUID()}`;
  const mutation = {
    mutations: [
      {
        create: {
          _id: id,
          _type: 'appointment',
          ...appointment,
          status: 'New',
          receivedAt: new Date().toISOString(),
        },
      },
    ],
  };
  const sanity = await fetch(
    `https://${env.SANITY_PROJECT_ID}.api.sanity.io/v2025-02-19/data/mutate/${env.SANITY_DATASET}`,
    {
      method: 'POST',
      headers: {
        authorization: `Bearer ${env.SANITY_WRITE_TOKEN}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify(mutation),
    }
  );
  if (!sanity.ok) throw new Error(`Sanity returned ${sanity.status}`);
  if (env.APPOINTMENT_WEBHOOK_URL)
    await fetch(env.APPOINTMENT_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ event: 'appointment.created', appointment }),
    });
  return id;
}

export default {
  async fetch(request, env): Promise<Response> {
    const origin = request.headers.get('Origin') || '';
    if (request.method === 'OPTIONS') return new Response(null, { headers: cors(env, origin) });
    const url = new URL(request.url);
    if (request.method === 'GET' && url.pathname === '/news') {
      const cache = await env.NEWS_CACHE.get<{ stories: Story[] }>('canada-immigration', 'json');
      return response(env, origin, {
        stories: cache?.stories || (await refreshNews(env)),
      });
    }
    if (request.method === 'POST' && url.pathname === '/make-post') {
      try {
        const story = (await request.json()) as Story;
        if (!story.title || !story.link)
          return response(env, origin, { message: 'A title and source link are required.' }, 400);
        return response(env, origin, {
          id: await createSanityDraft(env, story),
        });
      } catch (error) {
        return response(
          env,
          origin,
          {
            message: error instanceof Error ? error.message : 'Could not create draft',
          },
          500
        );
      }
    }
    if (request.method === 'POST' && url.pathname === '/appointment') {
      try {
        const appointment = (await request.json()) as Record<string, unknown>;
        if (!appointment.name || !appointment.email)
          return response(env, origin, { message: 'Name and email are required.' }, 400);
        return response(env, origin, { id: await createAppointment(env, appointment) }, 201);
      } catch (error) {
        return response(
          env,
          origin,
          {
            message: error instanceof Error ? error.message : 'Could not create appointment',
          },
          500
        );
      }
    }
    return response(env, origin, { message: 'Not found' }, 404);
  },
  async scheduled(_event, env): Promise<void> {
    await refreshNews(env);
  },
} satisfies ExportedHandler<Env>;
