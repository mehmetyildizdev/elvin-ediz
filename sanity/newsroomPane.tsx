import { Button, Card, Flex, Spinner, Stack, Text } from '@sanity/ui';
import { useState } from 'react';

type Story = {
  id: string;
  title: string;
  link: string;
  source?: string;
  publishedAt?: string;
};
const workerURL = process.env.SANITY_STUDIO_NEWSROOM_URL;

export function NewsroomPane() {
  const [stories, setStories] = useState<Story[]>([]);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  async function loadNews() {
    setBusy(true);
    setMessage('');
    try {
      const response = await fetch(`${workerURL}/news`);
      const data = (await response.json()) as {
        stories?: Story[];
        message?: string;
      };
      if (!response.ok) throw new Error(data.message || 'Could not load news');
      setStories(data.stories || []);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Could not load news');
    } finally {
      setBusy(false);
    }
  }
  async function makePost(story: Story) {
    setBusy(true);
    setMessage('');
    try {
      const response = await fetch(`${workerURL}/make-post`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(story),
      });
      const data = (await response.json()) as { id?: string; message?: string };
      if (!response.ok) throw new Error(data.message || 'Could not make draft');
      setMessage('Draft created. Open News posts to edit and publish it.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Could not make draft');
    } finally {
      setBusy(false);
    }
  }
  return (
    <Card padding={5}>
      <Stack space={5}>
        <Flex align="center" justify="space-between">
          <div>
            <Text size={3} weight="semibold">
              Canada Immigration News
            </Text>
            <Text muted size={1}>
              Daily Google News results. Stories are only saved when you make a post.
            </Text>
          </div>
          <Button text="Refresh list" onClick={loadNews} disabled={busy || !workerURL} />
        </Flex>
        {!workerURL && (
          <Text size={1}>Set SANITY_STUDIO_NEWSROOM_URL in the Studio environment first.</Text>
        )}
        {busy && <Spinner muted />}
        {message && (
          <Card tone="primary" padding={3}>
            <Text size={1}>{message}</Text>
          </Card>
        )}
        {stories.map((story) => (
          <Card key={story.id} border padding={3} radius={2}>
            <Flex gap={3} align="center" justify="space-between">
              <Stack space={2}>
                <Text weight="medium">{story.title}</Text>
                <Text muted size={1}>
                  {story.source || 'Google News'} ·{' '}
                  {story.publishedAt ? new Date(story.publishedAt).toLocaleDateString() : 'Today'}
                </Text>
                <a href={story.link} target="_blank" rel="noreferrer">
                  Open source ↗
                </a>
              </Stack>
              <Button
                text="Make a post"
                tone="primary"
                onClick={() => makePost(story)}
                disabled={busy}
              />
            </Flex>
          </Card>
        ))}
      </Stack>
    </Card>
  );
}
