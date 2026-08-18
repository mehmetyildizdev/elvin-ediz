import { createClient } from '@sanity/client';
import fs from 'fs';

if (fs.existsSync('.env.local')) {
  const envConfig = fs.readFileSync('.env.local', 'utf8');
  for (const line of envConfig.split('\n')) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
      const [key, ...valueParts] = trimmed.split('=');
      process.env[key.trim()] = valueParts.join('=').trim();
    }
  }
}

const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID;
const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  process.env.SANITY_STUDIO_DATASET ||
  'production';
const token = process.env.SANITY_EDITOR_TOKEN || process.env.SANITY_WRITE_TOKEN;

if (!projectId || !token) {
  console.error('Missing projectId or SANITY_EDITOR_TOKEN in environment');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2026-07-14',
  useCdn: false,
});

const realNewsPosts = [
  {
    _id: 'post-news-express-entry-score-distribution',
    _type: 'post',
    title: 'Canada Publishes Revised Distribution of Candidate Scores Within the Express Entry Pool',
    slug: {
      _type: 'slug',
      current: 'canada-express-entry-candidate-score-distribution-update',
    },
    kind: 'news',
    category: 'Express Entry',
    iconName: 'briefcase',
    sourceName: 'CIC News',
    sourceURL:
      'https://www.cicnews.com/2026/08/canada-publishes-revised-distribution-of-candidate-scores-within-the-express-entry-pool-0879327.html',
    readTime: '4 min read',
    excerpt:
      'IRCC has updated the Comprehensive Ranking System (CRS) score distribution in the federal pool, offering crucial insights into candidate competitiveness and upcoming invitation score thresholds.',
    editorialNote:
      'With CRS score clusters remaining highly competitive above 500 points, candidates should explore provincial nomination streams and French-language proficiency to secure decisive CRS score increases.',
    publishedAt: '2026-08-17T19:15:28.000Z',
    content: [
      {
        _key: 'b1',
        _type: 'block',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _key: 'c1',
            _type: 'span',
            marks: [],
            text: 'Immigration, Refugees and Citizenship Canada (IRCC) has released updated data illustrating the score distribution of candidates currently registered in the federal Express Entry pool.',
          },
        ],
      },
      {
        _key: 'b2',
        _type: 'block',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _key: 'c2',
            _type: 'span',
            marks: [],
            text: 'The statistical breakdown reflects recent draw sizes across Canadian Experience Class (CEC), Provincial Nominee Program (PNP), and targeted category selections. High-scoring candidates in specific technical and healthcare occupations continue to see prioritized invitations.',
          },
        ],
      },
      {
        _key: 'b3',
        _type: 'block',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _key: 'c3',
            _type: 'span',
            marks: [],
            text: 'Our advisory team recommends that applicants maintain active profile audits and maximize language scores or provincial pathways to optimize their selection probability.',
          },
        ],
      },
    ],
  },
  {
    _id: 'post-news-express-entry-pnp-draw',
    _type: 'post',
    title: 'Canada Invites Provincial Nominees to Apply for Permanent Residence in Dedicated Draw',
    slug: {
      _type: 'slug',
      current: 'canada-invites-provincial-nominees-express-entry-draw',
    },
    kind: 'news',
    category: 'Provincial Nominees',
    iconName: 'landmark',
    sourceName: 'CIC News',
    sourceURL:
      'https://www.cicnews.com/2026/08/canada-invites-provincial-nominees-to-apply-for-permanent-residence-0879061.html',
    readTime: '3 min read',
    excerpt:
      'In its latest program-specific round of invitations, IRCC issued Invitations to Apply (ITAs) exclusively to provincial nominee candidates with active Express Entry profiles.',
    editorialNote:
      'Provincial nomination continues to be the single most powerful factor in Express Entry, providing an automatic 600-point boost that guarantees an Invitation to Apply in subsequent rounds.',
    publishedAt: '2026-08-17T15:21:07.000Z',
    content: [
      {
        _key: 'b1',
        _type: 'block',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _key: 'c1',
            _type: 'span',
            marks: [],
            text: 'Federal immigration authorities conducted a targeted Express Entry draw dedicated exclusively to candidates who have received a provincial nomination certificate.',
          },
        ],
      },
      {
        _key: 'b2',
        _type: 'block',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _key: 'c2',
            _type: 'span',
            marks: [],
            text: 'This round underscores the federal government’s strategic partnership with provincial governments to channel skilled newcomers directly into regional economic centers experiencing acute labor shortages.',
          },
        ],
      },
      {
        _key: 'b3',
        _type: 'block',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _key: 'c3',
            _type: 'span',
            marks: [],
            text: 'Candidates who received an ITA have a 60-day window to submit a fully documented permanent residence application through the IRCC portal.',
          },
        ],
      },
    ],
  },
  {
    _id: 'post-news-citizenship-processing-times',
    _type: 'post',
    title: 'Processing Times Increase for Proof-of-Citizenship Applications Amid Rising Demand',
    slug: {
      _type: 'slug',
      current: 'citizenship-certificate-processing-times-demand-surge',
    },
    kind: 'news',
    category: 'Citizenship',
    iconName: 'shield',
    sourceName: 'CP24 News',
    sourceURL:
      'https://www.cp24.com/news/canada/2026/08/15/processing-times-have-been-increasing-for-proof-of-canadian-citizenship-heres-why/',
    readTime: '3 min read',
    excerpt:
      'IRCC processing timelines for Canadian Citizenship Certificates and citizenship proof applications have lengthened due to a substantial increase in cross-border applications.',
    editorialNote:
      'Individuals claiming Canadian citizenship by descent or requesting replacement certificates should file well in advance of anticipated travel or passport renewal needs.',
    publishedAt: '2026-08-15T09:00:00.000Z',
    content: [
      {
        _key: 'b1',
        _type: 'block',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _key: 'c1',
            _type: 'span',
            marks: [],
            text: 'Applications for Canadian citizenship certificates have experienced lengthened processing timelines as Immigration, Refugees and Citizenship Canada (IRCC) manages elevated application volumes.',
          },
        ],
      },
      {
        _key: 'b2',
        _type: 'block',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _key: 'c2',
            _type: 'span',
            marks: [],
            text: 'A growing number of applications originate from second-generation claimants and dual nationals seeking formal Canadian proof of citizenship documents following recent statutory and judicial clarifications on descent rights.',
          },
        ],
      },
      {
        _key: 'b3',
        _type: 'block',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _key: 'c3',
            _type: 'span',
            marks: [],
            text: 'Applicants can request urgent processing in verified emergency circumstances such as imminent employment start dates, access to provincial healthcare, or urgent travel.',
          },
        ],
      },
    ],
  },
  {
    _id: 'post-news-ircc-wait-times-dashboard',
    _type: 'post',
    title: 'Canada Updates Official Wait Times and Inventory Statistics for PR and Citizenship Applicants',
    slug: {
      _type: 'slug',
      current: 'canada-updates-wait-times-pr-citizenship-inventory',
    },
    kind: 'news',
    category: 'Immigration Processing',
    iconName: 'clock',
    sourceName: 'CIC News',
    sourceURL:
      'https://www.cicnews.com/2026/08/canada-updates-wait-times-for-permanent-residence-and-citizenship-applicants-0879131.html',
    readTime: '4 min read',
    excerpt:
      'IRCC has published updated service standards and historical processing averages across family sponsorship, economic PR, work permit extensions, and study permits.',
    editorialNote:
      'Tracking real-time inventory levels helps applicants and employers accurately plan start dates and bridge work permits before current status expires.',
    publishedAt: '2026-08-14T14:10:00.000Z',
    content: [
      {
        _key: 'b1',
        _type: 'block',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _key: 'c1',
            _type: 'span',
            marks: [],
            text: 'In its ongoing transparency initiative, IRCC has released refreshed processing time metrics across major temporary and permanent immigration programs.',
          },
        ],
      },
      {
        _key: 'b2',
        _type: 'block',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _key: 'c2',
            _type: 'span',
            marks: [],
            text: 'The updated figures show stabilized timelines for Express Entry electronic applications (e-APRs) while provincial paper-based streams and overseas family class applications continue to experience queue variability.',
          },
        ],
      },
      {
        _key: 'b3',
        _type: 'block',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _key: 'c3',
            _type: 'span',
            marks: [],
            text: 'Applicants with active files are encouraged to monitor their tracker accounts and verify biometric and medical document validity.',
          },
        ],
      },
    ],
  },
  {
    _id: 'post-news-transport-workers-express-entry',
    _type: 'post',
    title: 'Canada Invites 300 Transport Sector Workers in First Category-Based Draw Under Revamped Stream',
    slug: {
      _type: 'slug',
      current: 'canada-invites-transport-workers-express-entry-category-draw',
    },
    kind: 'news',
    category: 'Express Entry',
    iconName: 'truck',
    sourceName: 'Immigration.ca',
    sourceURL:
      'https://immigration.ca/canada-invites-300-transport-workers-express-entry-draw-august-7-2026/',
    readTime: '4 min read',
    excerpt:
      'A dedicated category-based Express Entry round targeted skilled transport professionals, including commercial pilots, aircraft mechanics, and rail operators.',
    editorialNote:
      'Category-based selection provides a crucial advantage for trades and transport professionals whose CRS scores may be lower than general pool averages.',
    publishedAt: '2026-08-07T16:00:00.000Z',
    content: [
      {
        _key: 'b1',
        _type: 'block',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _key: 'c1',
            _type: 'span',
            marks: [],
            text: 'Canada has issued 300 Invitations to Apply to transport sector professionals in a targeted category-based Express Entry draw.',
          },
        ],
      },
      {
        _key: 'b2',
        _type: 'block',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _key: 'c2',
            _type: 'span',
            marks: [],
            text: 'The revamped transport category addresses critical supply chain and infrastructure requirements across the country, prioritizing licensed commercial pilots, aircraft maintenance engineers, railway traffic controllers, and specialized transport managers.',
          },
        ],
      },
      {
        _key: 'b3',
        _type: 'block',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _key: 'c3',
            _type: 'span',
            marks: [],
            text: 'Eligible candidates required at least 6 months of continuous full-time work experience within the past 3 years in an eligible transport NOC code.',
          },
        ],
      },
    ],
  },
  {
    _id: 'post-news-newfoundland-provincial-draw',
    _type: 'post',
    title: 'Newfoundland and Labrador Issues 208 Invitations in Latest Provincial Immigration Selection',
    slug: {
      _type: 'slug',
      current: 'newfoundland-labrador-provincial-nomination-draw-august-2026',
    },
    kind: 'news',
    category: 'Provincial Nominees',
    iconName: 'globe',
    sourceName: 'CIC News',
    sourceURL:
      'https://www.cicnews.com/2026/08/newfoundland-and-labrador-invites-208-candidates-in-provincial-immigration-draw-0879255.html',
    readTime: '3 min read',
    excerpt:
      'The Newfoundland and Labrador Provincial Nominee Program (NLPNP) invited 208 international graduates and skilled workers with high-demand qualifications.',
    editorialNote:
      'Atlantic Canada provincial nomination streams offer accessible pathway options for international graduates and skilled workers seeking expedited permanent residency outside major metropolises.',
    publishedAt: '2026-08-16T11:05:37.000Z',
    content: [
      {
        _key: 'b1',
        _type: 'block',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _key: 'c1',
            _type: 'span',
            marks: [],
            text: 'The Government of Newfoundland and Labrador has issued 208 notifications of interest through its provincial nominee pathways.',
          },
        ],
      },
      {
        _key: 'b2',
        _type: 'block',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _key: 'c2',
            _type: 'span',
            marks: [],
            text: 'Invitations targeted skilled professionals in healthcare, technology, marine operations, and renewable energy sectors who hold local job offers or graduation credentials from provincial post-secondary institutions.',
          },
        ],
      },
      {
        _key: 'b3',
        _type: 'block',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _key: 'c3',
            _type: 'span',
            marks: [],
            text: 'Provincial nominees gain an accelerated pathway to permanent residence via the federal Atlantic Immigration Program and Express Entry alignments.',
          },
        ],
      },
    ],
  },
];

async function syncRealNews() {
  console.log(`Connecting to Sanity (${dataset})...`);

  // 1. Find Nazly staff ID
  let staffId = 'staff-nazly';
  try {
    const staffDoc = await client.fetch(
      `*[_type == "staffMember" && (name match "*Nazly*" || _id == "staff-nazly")][0]{ _id, name }`
    );
    if (staffDoc?._id) {
      staffId = staffDoc._id;
      console.log(`Resolved staff author: ${staffDoc.name} (${staffId})`);
    }
  } catch (err) {
    console.warn('Could not query staff document, using fallback ID:', staffId);
  }

  // 2. Fetch existing news posts in Sanity to delete/overwrite old ones
  const existingNews = await client.fetch(
    `*[_type == "post" && kind == "news"]{ _id, title }`
  );
  console.log(`Found ${existingNews.length} existing news posts in Sanity.`);

  for (const item of existingNews) {
    console.log(`Deleting old news post: "${item.title}" (${item._id})...`);
    await client.delete(item._id);
  }

  // 3. Write real news posts to data/news-posts.json
  const formattedPosts = realNewsPosts.map((p) => ({
    ...p,
    author: {
      _type: 'reference',
      _ref: staffId,
    },
  }));

  fs.writeFileSync('data/news-posts.json', JSON.stringify(formattedPosts, null, 2));
  console.log('Saved 6 real news posts to data/news-posts.json.');

  // 4. Create new real posts in Sanity
  console.log('Pushing 6 real news posts to Sanity...');
  for (const post of formattedPosts) {
    const res = await client.create(post);
    console.log(`✓ Created "${res.title}" with source: ${res.sourceURL}`);
  }

  console.log('\nAll 6 real news posts with direct permalinks successfully synced to Sanity!');
}

syncRealNews().catch((err) => {
  console.error('Error syncing real news:', err);
  process.exit(1);
});
