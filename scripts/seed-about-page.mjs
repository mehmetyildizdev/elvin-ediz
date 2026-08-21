import { createClient } from '@sanity/client';
import fs from 'fs';

// Read .env.local manually if present
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
  process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_STUDIO_DATASET || 'production';
const token = process.env.SANITY_EDITOR_TOKEN || process.env.SANITY_API_WRITE_TOKEN;

if (!projectId) {
  console.error('Error: SANITY_PROJECT_ID is missing in environment');
  process.exit(1);
}

if (!token) {
  console.error('Error: SANITY_EDITOR_TOKEN / SANITY_API_WRITE_TOKEN is missing');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2026-07-14',
  useCdn: false,
});

const enAboutPage = {
  _id: 'aboutPage',
  _type: 'aboutPage',
  language: 'en',
  eyebrow: 'ABOUT ELVIN EDIZ',
  titleMain: 'Your Trusted Partner in',
  titleAccent: 'Canadian Immigration.',
  description:
    'Founded on transparency, integrity, and RCIC-regulated expertise, we provide personalized guidance to help individuals, professionals, and families navigate Canadian immigration regulations with confidence.',

  whoAreWeEyebrow: 'WHO ARE WE?',
  whoAreWeTitle: 'Elvin Ediz Immigration Services',
  whoAreWeParagraph1:
    'Elvin Ediz Immigration Services is a Toronto-based Canadian immigration firm led by Nazly Sunguroglu, RCIC (Regulated Canadian Immigration Consultant). We provide structured, end-to-end guidance across economic immigration, study pathways, work permits, family sponsorship, and citizenship.',
  whoAreWeParagraph2:
    'Every profile is assessed with direct oversight from an RCIC, ensuring your submission meets current IRCC criteria and minimizes avoidable processing delays.',
  whoAreWePrimaryCtaText: 'Free Consultation',
  whoAreWePrimaryCtaLink: '',
  whoAreWeSecondaryCtaText: 'Send a Message',
  whoAreWeSecondaryCtaLink: '#contact',
  ciccBadgeTitle: 'CICC REGISTERED & APPROVED',
  ciccBadgeSubtitle:
    'Regulated Canadian Immigration Consultant (RCIC)\nMember of the College of Immigration and Citizenship Consultants.',
  stats: [
    { _key: 'stat-1', number: '4,578+', label: 'Trusted Clients', icon: 'user-check' },
    { _key: 'stat-2', number: '99%', label: 'Worldwide Approvals', icon: 'globe' },
    { _key: 'stat-3', number: '50+', label: 'Canadian Colleges', icon: 'school' },
    { _key: 'stat-4', number: '120+', label: 'Successful PR Visas', icon: 'graduation' },
    { _key: 'stat-5', number: '100%', label: 'Regulated RCIC Support', icon: 'file-check' },
  ],

  strategyEyebrow: 'ELVIN EDIZ IMMIGRATION SERVICES',
  strategyTitleMain: 'Our',
  strategyTitleAccent: 'Strategy',
  strategyLeaderName: 'Nazly Sunguroglu (RCIC)',
  strategyLeaderRole: 'Regulated Canadian Immigration Consultant',
  strategyLeaderSubtitle: 'Founder of Elvin Ediz Immigration Services',
  strategyQuoteParagraph:
    'We believe Canadian immigration should be empowering, not overwhelming.',
  strategyBodyParagraph:
    'With personalized assessment and clear strategic direction, we help individuals, students, professionals, and families navigate Canadian immigration regulations with confidence.',
  credentials: [
    'CICC Licensed & Active Member #R533968',
    'CAPIC (Canadian Association of Professional Immigration Consultants)',
    'Authorized IRCC Representation Across All Canadian Provinces',
    'End-to-End File Audit & Direct Client Communication',
  ],
  strategyCtaText: 'Free Consultation',
  strategyCtaLink: '',

  processEyebrow: 'THE ELVIN EDIZ WAY',
  processTitleMain: 'Less uncertainty.',
  processTitleAccent: 'More momentum.',
  processSteps: [
    {
      _key: 'step-1',
      number: '01',
      title: 'Start with a conversation',
      text: 'We listen to your plans, questions, and circumstances.',
    },
    {
      _key: 'step-2',
      number: '02',
      title: 'Find your right pathway',
      text: 'Together, we map out an approach that makes sense for you.',
    },
    {
      _key: 'step-3',
      number: '03',
      title: 'Move forward with confidence',
      text: 'We help you prepare, submit, and understand what comes next.',
    },
  ],

  ctaEyebrow: 'START YOUR JOURNEY',
  ctaTitleMain: 'Ready to discuss your Canadian',
  ctaTitleAccent: 'immigration goals?',
  ctaDescription:
    'Book a strategic consultation with Nazly Sunguroglu, RCIC to evaluate your eligibility, understand current IRCC processing, and chart your optimal pathway.',
  ctaButtonText: 'Book Free Consultation',
  ctaButtonLink: '',
};

const trAboutPage = {
  _id: 'aboutPage-tr',
  _type: 'aboutPage',
  language: 'tr',
  eyebrow: 'ELVIN EDIZ HAKKINDA',
  titleMain: 'Kanada Göçmenliğinde',
  titleAccent: 'Güvenilir Çözüm Ortağınız.',
  description:
    'Şeffaflık, dürüstlük ve RCIC lisanslı danışmanlık üzerine kurulan firmamız, bireylerin ve ailelerin Kanada göçmenlik süreçlerini güvenle yönetmelerini sağlar.',

  whoAreWeEyebrow: 'BİZ KİMİZ?',
  whoAreWeTitle: 'Elvin Ediz Göçmenlik Hizmetleri',
  whoAreWeParagraph1:
    'Elvin Ediz Immigration Services, Nazly Sunguroglu (RCIC - Lisanslı Kanada Göçmenlik Danışmanı) liderliğinde Toronto merkezli olarak hizmet vermektedir.',
  whoAreWeParagraph2:
    'Tüm dosyalar doğrudan lisanslı danışman denetiminde incelenir ve güncel IRCC kurallarına uygun olarak hazırlanır.',
  whoAreWePrimaryCtaText: 'Ücretsiz Ön Değerlendirme',
  whoAreWePrimaryCtaLink: '',
  whoAreWeSecondaryCtaText: 'Mesaj Gönderin',
  whoAreWeSecondaryCtaLink: '#contact',
  ciccBadgeTitle: 'CICC KAYITLI & ONAYLI',
  ciccBadgeSubtitle:
    'Lisanslı Kanada Göçmenlik Danışmanı (RCIC)\nCICC (Göçmenlik ve Vatandaşlık Danışmanları Koleji) Üyesi.',
  stats: [
    { _key: 'tr-stat-1', number: '4,578+', label: 'Güvenen Danışan', icon: 'user-check' },
    { _key: 'tr-stat-2', number: '99%', label: 'Küresel Başarı', icon: 'globe' },
    { _key: 'tr-stat-3', number: '50+', label: 'Kanada Koleji', icon: 'school' },
    { _key: 'tr-stat-4', number: '120+', label: 'Başarılı PR Vizesi', icon: 'graduation' },
    { _key: 'tr-stat-5', number: '100%', label: 'RCIC Lisanslı Destek', icon: 'file-check' },
  ],

  strategyEyebrow: 'ELVIN EDIZ GÖÇMENLİK HİZMETLERİ',
  strategyTitleMain: 'Bizim',
  strategyTitleAccent: 'Stratejimiz',
  strategyLeaderName: 'Nazly Sunguroglu (RCIC)',
  strategyLeaderRole: 'Lisanslı Kanada Göçmenlik Danışmanı',
  strategyLeaderSubtitle: 'Elvin Ediz Göçmenlik Hizmetleri Kurucusu',
  strategyQuoteParagraph:
    'Kanada göçmenliğinin karmaşık değil, güçlendirici bir süreç olması gerektiğine inanıyoruz.',
  strategyBodyParagraph:
    'Kişiye özel analiz ve net stratejik planlama ile bireylere ve ailelere tüm aşamalarda güvenilir rehberlik sağlıyoruz.',
  credentials: [
    'CICC Lisanslı ve Aktif Üye #R533968',
    'CAPIC (Kanada Profesyonel Göçmenlik Danışmanları Derneği) Üyesi',
    'Tüm Kanada Eyaletlerinde Yetkili IRCC Temsilciliği',
    'Uçtan Uca Dosya Denetimi ve Doğrudan İletişim',
  ],
  strategyCtaText: 'Ücretsiz Ön Değerlendirme',
  strategyCtaLink: '',

  processEyebrow: 'ELVIN EDIZ YAKLAŞIMI',
  processTitleMain: 'Daha az belirsizlik.',
  processTitleAccent: 'Daha hızlı ilerleme.',
  processSteps: [
    {
      _key: 'tr-step-1',
      number: '01',
      title: 'Bir görüşme ile başlayın',
      text: 'Planlarınızı, sorularınızı ve mevcut durumunuzu dinliyoruz.',
    },
    {
      _key: 'tr-step-2',
      number: '02',
      title: 'Doğru yol haritasını belirleyin',
      text: 'Birlikte hedeflerinize ve profilinize en uygun yolu çiziyoruz.',
    },
    {
      _key: 'tr-step-3',
      number: '03',
      title: 'Güvenle ilerleyin',
      text: 'Başvurunuzu hazırlıyor, sunuyor ve sonraki adımları netleştiriyoruz.',
    },
  ],

  ctaEyebrow: 'YOLCULUĞUNUZA BAŞLAYIN',
  ctaTitleMain: 'Kanada göçmenlik hedeflerinizi',
  ctaTitleAccent: 'konuşmaya hazır mısınız?',
  ctaDescription:
    'Uygunluğunuzu değerlendirmek ve doğru yolu çizmek için Nazly Sunguroglu (RCIC) ile stratejik danışmanlık randevusu planlayın.',
  ctaButtonText: 'Randevu Planlayın',
  ctaButtonLink: '',
};

async function seedAboutPage() {
  console.log(`Seeding aboutPage in Sanity dataset "${dataset}"...`);

  await client.createOrReplace(enAboutPage);
  console.log('Created / replaced English aboutPage document');

  await client.createOrReplace(trAboutPage);
  console.log('Created / replaced Turkish aboutPage document (aboutPage-tr)');

  console.log('About page seeding complete!');
}

seedAboutPage().catch((err) => {
  console.error('Error seeding about page:', err);
  process.exit(1);
});
