export const ADMIN_EMAILS = new Set(['romant997@gmail.com', 'kolyadov.denis@gmail.com'])

export function isAdminEmail(email) {
  return ADMIN_EMAILS.has(String(email || '').trim().toLowerCase())
}
