/**
 * Normalizes a phone number, raw string, or URL into a direct WhatsApp chat link (wa.me).
 * Supports plain phone numbers (e.g. '123456789', '+1 (647) 568 1009'),
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

  // If it's an external custom URL (e.g. "/contact" or non-WhatsApp url)
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
    return input;
  }

  return message
    ? `https://wa.me/${cleanDigits}?text=${encodeURIComponent(message)}`
    : `https://wa.me/${cleanDigits}`;
}
