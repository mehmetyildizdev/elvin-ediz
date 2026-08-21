import type { PostData } from '@/sanity/lib/types';
import { defaultInsightPosts } from './insights';
import { defaultInformationPosts } from './information';
import { defaultAnnouncementPosts } from './announcements';
import { defaultNewsPosts } from './news';

export * from './insights';
export * from './information';
export * from './announcements';
export * from './news';

export const defaultPosts: PostData[] = [
  ...defaultInsightPosts,
  ...defaultInformationPosts,
  ...defaultAnnouncementPosts,
  ...defaultNewsPosts,
];

export const backupPosts = defaultPosts;
