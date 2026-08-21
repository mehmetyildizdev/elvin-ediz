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

const defaultContactFormEn = {
  contactNameLabel: 'Your name',
  contactNamePlaceholder: 'How should we call you?',
  contactEmailLabel: 'Email address',
  contactEmailPlaceholder: 'you@example.com',
  contactPhoneLabel: 'Phone number',
  contactPhonePlaceholder: 'Your preferred number',
  contactOptionalText: '(optional)',
  contactServiceLabel: 'What can we help with?',
  contactServicePlaceholder: 'Select a service',
  contactMessageLabel: 'Tell us a little more',
  contactMessagePlaceholder: 'What would you like help with?',
  contactSubmitButtonText: 'Free Consultation Request',
  contactSubmittingText: 'Sending…',
  contactSuccessMessage: "Thank you — we'll be in touch soon.",
  contactErrorMessage: 'Something went wrong. Please email us directly.',
  contactDisclaimer: 'By submitting, you agree to be contacted by Elvin Ediz Immigration Services.',
};

const defaultContactFormTr = {
  contactNameLabel: 'Adınız Soyadınız',
  contactNamePlaceholder: 'Size nasıl hitap edelim?',
  contactEmailLabel: 'E-posta adresiniz',
  contactEmailPlaceholder: 'ornek@eposta.com',
  contactPhoneLabel: 'Telefon numaranız',
  contactPhonePlaceholder: 'Tercih ettiğiniz numara',
  contactOptionalText: '(isteğe bağlı)',
  contactServiceLabel: 'Size nasıl yardımcı olabiliriz?',
  contactServicePlaceholder: 'Bir hizmet seçin',
  contactMessageLabel: 'Bize biraz daha detay verin',
  contactMessagePlaceholder: 'Hangi konuda danışmanlık almak istersiniz?',
  contactSubmitButtonText: 'Ücretsiz Danışmanlık Talebi',
  contactSubmittingText: 'Gönderiliyor…',
  contactSuccessMessage: 'Teşekkürler — en kısa sürede sizinle iletişime geçeceğiz.',
  contactErrorMessage: 'Bir sorun oluştu. Lütfen doğrudan e-posta ile bize ulaşın.',
  contactDisclaimer:
    'Göndererek, Elvin Ediz Immigration Services tarafından sizinle iletişime geçilmesini kabul etmiş olursunuz.',
};

async function seedContactForm() {
  console.log(`Updating Contact Form fields in Sanity dataset "${dataset}"...`);

  const existingDocs = await client.fetch('*[_type == "homePage"]');

  if (existingDocs.length === 0) {
    console.log('No homePage document found.');
    return;
  }

  for (const doc of existingDocs) {
    const isTr = doc.language === 'tr';
    const defaults = isTr ? defaultContactFormTr : defaultContactFormEn;

    const patch = client.patch(doc._id).setIfMissing({
      contactNameLabel: defaults.contactNameLabel,
      contactNamePlaceholder: defaults.contactNamePlaceholder,
      contactEmailLabel: defaults.contactEmailLabel,
      contactEmailPlaceholder: defaults.contactEmailPlaceholder,
      contactPhoneLabel: defaults.contactPhoneLabel,
      contactPhonePlaceholder: defaults.contactPhonePlaceholder,
      contactOptionalText: defaults.contactOptionalText,
      contactServiceLabel: defaults.contactServiceLabel,
      contactServicePlaceholder: defaults.contactServicePlaceholder,
      contactMessageLabel: defaults.contactMessageLabel,
      contactMessagePlaceholder: defaults.contactMessagePlaceholder,
      contactSubmitButtonText: defaults.contactSubmitButtonText,
      contactSubmittingText: defaults.contactSubmittingText,
      contactSuccessMessage: defaults.contactSuccessMessage,
      contactErrorMessage: defaults.contactErrorMessage,
      contactDisclaimer: defaults.contactDisclaimer,
    });

    await patch.commit();
    console.log(`Updated contact form fields on document ${doc._id} (${doc.language || 'en'})`);
  }

  console.log('Contact form seed complete!');
}

seedContactForm().catch((err) => {
  console.error('Error seeding contact form:', err);
  process.exit(1);
});
