import type { PhoneValidation } from '../types/dashboard';

// Códigos de país LATAM más comunes
const LATAM_COUNTRY_CODES: Record<string, { code: string; length: number; name: string }> = {
  '+51': { code: '51', length: 9, name: 'Perú' },          // Perú
  '+52': { code: '52', length: 10, name: 'México' },        // México
  '+53': { code: '53', length: 8, name: 'Cuba' },          // Cuba
  '+54': { code: '54', length: 10, name: 'Argentina' },     // Argentina
  '+55': { code: '55', length: 11, name: 'Brasil' },        // Brasil
  '+56': { code: '56', length: 9, name: 'Chile' },          // Chile
  '+57': { code: '57', length: 10, name: 'Colombia' },      // Colombia
  '+58': { code: '58', length: 10, name: 'Venezuela' },     // Venezuela
  '+591': { code: '591', length: 8, name: 'Bolivia' },      // Bolivia
  '+593': { code: '593', length: 9, name: 'Ecuador' },      // Ecuador
  '+595': { code: '595', length: 9, name: 'Paraguay' },     // Paraguay
  '+598': { code: '598', length: 9, name: 'Uruguay' },      // Uruguay
  '+506': { code: '506', length: 8, name: 'Costa Rica' },   // Costa Rica
  '+507': { code: '507', length: 8, name: 'Panamá' },       // Panamá
  '+503': { code: '503', length: 8, name: 'El Salvador' },  // El Salvador
  '+502': { code: '502', length: 8, name: 'Guatemala' },    // Guatemala
  '+504': { code: '504', length: 8, name: 'Honduras' },     // Honduras
  '+505': { code: '505', length: 8, name: 'Nicaragua' },    // Nicaragua
  '+1': { code: '1', length: 10, name: 'USA/Canadá' },      // USA/Canadá (agregado por relevancia)
};

/**
 * Sanitiza un número de teléfono removiendo espacios, guiones y paréntesis
 */
export function sanitizePhone(phone: string): string {
  return phone.replace(/[\s\-\(\)\.]/g, '');
}

/**
 * Valida y sanitiza un número de teléfono para países LATAM
 */
export function validateLatamPhone(phone: string): PhoneValidation {
  const sanitized = sanitizePhone(phone);

  // Verificar si empieza con +
  if (!sanitized.startsWith('+')) {
    return {
      isValid: false,
      formatted: sanitized,
      countryCode: '',
      nationalNumber: '',
    };
  }

  // Buscar el código de país
  let matchedCode: string | null = null;
  let matchedData: typeof LATAM_COUNTRY_CODES[string] | null = null;

  for (const [prefix, data] of Object.entries(LATAM_COUNTRY_CODES)) {
    if (sanitized.startsWith(prefix)) {
      // Usar el código más largo que coincida (para casos como +1 vs +591)
      if (!matchedCode || prefix.length > matchedCode.length) {
        matchedCode = prefix;
        matchedData = data;
      }
    }
  }

  if (!matchedCode || !matchedData) {
    return {
      isValid: false,
      formatted: sanitized,
      countryCode: '',
      nationalNumber: '',
    };
  }

  // Extraer el número nacional (sin código de país)
  const nationalNumber = sanitized.slice(matchedCode.length);

  // Validar longitud del número nacional
  const isValid = nationalNumber.length === matchedData.length;

  return {
    isValid,
    formatted: sanitized,
    countryCode: matchedData.code,
    nationalNumber,
  };
}

/**
 * Formatea un número para WhatsApp (sin +, solo dígitos)
 */
export function formatForWhatsApp(phone: string): string {
  const sanitized = sanitizePhone(phone);
  return sanitized.replace(/^\+/, ''); // Remover el +
}

/**
 * Genera un enlace de WhatsApp con mensaje predefinido
 */
export function generateWhatsAppLink(phone: string, message?: string): string {
  const whatsappNumber = formatForWhatsApp(phone);
  const encodedMessage = message ? encodeURIComponent(message) : '';
  const baseUrl = 'https://wa.me';

  return message
    ? `${baseUrl}/${whatsappNumber}?text=${encodedMessage}`
    : `${baseUrl}/${whatsappNumber}`;
}

/**
 * Genera un enlace mailto para Gmail
 */
export function generateGmailLink(email: string, subject?: string, body?: string): string {
  const params = new URLSearchParams();
  if (subject) params.append('subject', subject);
  if (body) params.append('body', body);

  const queryString = params.toString();
  return `mailto:${email}${queryString ? `?${queryString}` : ''}`;
}

/**
 * Obtiene información del país basado en el código
 */
export function getCountryInfo(phone: string): { name: string; code: string } | null {
  const validation = validateLatamPhone(phone);
  if (!validation.isValid || !validation.countryCode) return null;

  const countryData = Object.values(LATAM_COUNTRY_CODES).find(
    c => c.code === validation.countryCode
  );

  return countryData ? { name: countryData.name, code: countryData.code } : null;
}
