import type { MetadataRoute } from 'next';
import { fetchPosts } from '@/sanity/lib/data';
import { BASE_URL } from '@/sanity/lib/seo';

export const revalidate = 86400; // Regenerate sitemap daily (24 hours)

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await fetchPosts();

  // 01. Core Static Routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/insights`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/news`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/information`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/announcements`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/questions`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // 02. Dynamic Post Routes (excluding noIndex posts)
  const postRoutes: MetadataRoute.Sitemap = posts
    .filter((post) => Boolean(post.slug) && !post.seo?.noIndex)
    .map((post) => {
      const lastModified = post.publishedAt ? new Date(post.publishedAt) : new Date();

      return {
        url: `${BASE_URL}/insights/${post.slug}`,
        lastModified,
        changeFrequency: post.kind === 'news' ? 'daily' : 'monthly',
        priority: 0.7,
      };
    });

  return [...staticRoutes, ...postRoutes];
}
