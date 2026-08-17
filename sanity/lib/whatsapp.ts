/**
 * Normalizes a phone number, raw string, or URL into a direct WhatsApp chat link (wa.me).
 * Supports plain phone numbers (e.g. '123456789', '+1 234 567 89'),
 * existing wa.me links, or custom URLs.
 */
export function getWhatsAppUrl(
  whatsappInput?: string | null,
  message?: string
): string {
  const input = (whatsappInput || '').trim();

  // If no input is provided, fallback to default WhatsApp number
  if (!input) {
    const fallbackNumber = '123456789';
    return message
      ? `https://wa.me/${fallbackNumber}?text=${encodeURIComponent(message)}`
      : `https://wa.me/${fallbackNumber}`;
  }

  // If it's an external custom URL other than wa.me (e.g. "/contact" or non-WhatsApp url)
  if (
    (input.startsWith('/') || input.startsWith('http://') || input.startsWith('https://')) &&
    !input.includes('wa.me') &&
    !input.includes('whatsapp.com')
  ) {
    return input;
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
 * Resolves a CTA link: If a custom internal/external page link is provided (/contact, https://...),
 * it is preserved. If the CTA link is empty or is a WhatsApp link (like old wa.me), it uses the
 * dynamic Site Settings WhatsApp number.
 */
export function resolveCtaLink(
  customLink?: string | null,
  whatsappNumber?: string | null,
  message?: string
): string {
  const link = (customLink || '').trim();

  // If a custom non-whatsapp URL is set (e.g. /contact, /services, https://calendly.com), respect it
  if (
    link &&
    (link.startsWith('/') || link.startsWith('http://') || link.startsWith('https://')) &&
    !link.includes('wa.me') &&
    !link.includes('whatsapp.com')
  ) {
    return link;
  }

  // Otherwise, use the dynamic WhatsApp number from site settings
  return getWhatsAppUrl(whatsappNumber, message);
}

