import type { GoogleReviewsData } from '@/sanity/lib/types';

export const backupGoogleReviews: GoogleReviewsData = {
  businessName: 'Elvin Ediz Immigration Services',
  rating: 4.9,
  totalReviews: 73,
  googleMapsUrl:
    'https://www.google.com/maps/place/Elvin+Ediz+Immigration+Services/@43.846367,-79.383731,17z/data=!4m6!3m5!1s0x42609be984f53c27:0x8157fbe4a4cd3191!8m2!3d43.846367!4d-79.383731!16s%2Fg%2F11qb5x2mcv',
  writeReviewUrl: 'https://search.google.com/local/writereview?placeid=ChIJNzT1hOmbYEERkTHNpOT7V4E',
  lastSyncedAt: new Date().toISOString(),
  reviews: [
    {
      author: 'Salim Furkan ÖZTÜRK',
      rating: 5,
      date: 'Recent',
      quote:
        'Exceptional service and clear guidance throughout the entire immigration process. Nazly was extremely supportive and professional.',
      highlight: true,
    },
    {
      author: 'Snyldz Yldz',
      rating: 5,
      date: 'Recent',
      quote:
        'Great experience with Elvin Ediz Immigration Services. Every question was answered promptly with honest, clear guidance.',
      highlight: true,
    },
    {
      author: 'Buse Şahingöklü',
      rating: 5,
      date: 'Recent',
      quote:
        'Professional, trustworthy, and very knowledgeable. Nazly handled our case with utmost dedication.',
      highlight: true,
    },
    {
      author: 'Ertan Sokmen',
      rating: 5,
      date: 'Recent',
      quote:
        'I am extremely impressed with the professionalism and expertise Ms. Nazly brought to my case. Once she took over, everything moved smoothly.',
      highlight: true,
    },
    {
      author: 'Sarah D.',
      rating: 5,
      date: 'Recent',
      quote:
        'We applied for my mother. Everything was very easy and our visa was approved. Guidance was provided accurately on time.',
      highlight: true,
    },
  ],
};

export const defaultGoogleReviews = backupGoogleReviews;
