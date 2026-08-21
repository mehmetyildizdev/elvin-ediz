/**
 * Checks if an input string is a custom URL/scheme rather than a WhatsApp link/number.
 */
function isNonWhatsAppLink(input: string): boolean {
  if (!input) return false;
  const trimmed = input.trim();
  if (trimmed.includes('wa.me') || trimmed.includes('whatsapp.com')) {
    return false;
  }
  return (
    trimmed.startsWith('/') ||
    trimmed.startsWith('#') ||
    trimmed.startsWith('mailto:') ||
    trimmed.startsWith('tel:') ||
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://') ||
    (trimmed.includes('@') && !trimmed.includes(' ') && !trimmed.includes('/'))
  );
}

function formatCustomLink(input: string): string {
  const trimmed = input.trim();
  if (
    trimmed.includes('@') &&
    !trimmed.startsWith('mailto:') &&
    !trimmed.includes('/') &&
    !trimmed.startsWith('http')
  ) {
    return `mailto:${trimmed}`;
  }
  return trimmed;
}

/**
 * Normalizes a phone number, raw string, or URL into a direct WhatsApp chat link (wa.me).
 * Supports plain phone numbers (e.g. '123456789', '+1 234 567 89'),
 * existing wa.me links, or custom URLs.
 */
export function getWhatsAppUrl(whatsappInput?: string | null, message?: string): string {
  const input = (whatsappInput || '').trim();

  // If no input is provided, fallback to default WhatsApp number
  if (!input) {
    const fallbackNumber = '123456789';
    return message
      ? `https://wa.me/${fallbackNumber}?text=${encodeURIComponent(message)}`
      : `https://wa.me/${fallbackNumber}`;
  }

  // If it's an external custom URL/scheme (e.g. "/contact", "mailto:...", "#contact")
  if (isNonWhatsAppLink(input)) {
    return formatCustomLink(input);
  }

  // Extract clean digits (e.g. "123456789", "+1 234 567 89" -> "123456789")
  const cleanDigits = input.replace(/\D/g, '');

  if (!cleanDigits) {
    return 'https://wa.me/123456789';
  }

  return message
    ? `https://wa.me/${cleanDigits}?text=${encodeURIComponent(message)}`
    : `https://wa.me/${cleanDigits}`;
}

/**
 * Resolves a CTA link:
 * 1. If empty, falls back to the dynamic Site Settings WhatsApp number.
 * 2. If a custom URL/scheme is set (/contact, mailto:..., tel:..., #contact, https://...), respects it.
 * 3. If a customized WhatsApp link is set (https://wa.me/...), respects it.
 * 4. If a custom phone number is entered on this button, formats a WhatsApp link for that number.
 */
export function resolveCtaLink(
  customLink?: string | null,
  whatsappNumber?: string | null,
  message?: string
): string {
  const link = (customLink || '').trim();

  // If the field is empty, fallback to the dynamic Site Settings WhatsApp number
  if (!link) {
    return getWhatsAppUrl(whatsappNumber, message);
  }

  // If a custom non-whatsapp URL/scheme is set (e.g. mailto:..., /contact, /services, #contact), respect it
  if (isNonWhatsAppLink(link)) {
    return formatCustomLink(link);
  }

  // If the user entered a custom WhatsApp URL specifically on this CTA (e.g. https://wa.me/...), respect it!
  if (link.includes('wa.me') || link.includes('whatsapp.com')) {
    return link;
  }

  // If the user typed a specific phone number into this CTA field
  return getWhatsAppUrl(link, message);
}
