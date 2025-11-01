const disposableDomains = new Set([
  '10minutemail.com', 'temp-mail.org', 'guerrillamail.com', 'mailinator.com',
  'getnada.com', 'throwawaymail.com', 'yopmail.com', 'maildrop.cc',
  // Add more domains as needed
]);

export function isValidEmail(email: string): boolean {
  if (!email || !email.includes('@')) {
    return false;
  }
  const domain = email.split('@')[1];
  if (disposableDomains.has(domain.toLowerCase())) {
    return false;
  }
  // Basic regex for email structure
  const emailRegex = /^[^S@]+@[^S@]+\.[^S@]+$/;
  return emailRegex.test(email);
}
