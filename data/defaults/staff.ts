import type { StaffData } from '@/sanity/lib/types';

export const backupStaff: StaffData[] = [
  {
    _id: 'staff-nazly',
    name: 'Nazly Sunguroglu',
    designation: 'RCIC',
    role: 'Regulated Canadian Immigration Consultant',
    subtitle: 'Founder of Elvin Ediz Immigration Services',
    photoUrl: '/nazly-profile-picture.png',
    email: 'info@elvinediz.com',
    order: 1,
    bio: `Elvin Ediz Immigration Services believes every individual is unique with a one-of-a-kind goal in life.

Our personalized approach believes that Pragmatism is the key to handling your case. Considering your circumstances will maximize the effectiveness of your application when you engage with our legal team, you will know your rights and options, if you qualify for a specific program, and the chances of a successful case.`,
  },
];

export const defaultStaff = backupStaff;
