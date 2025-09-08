export const isValidUrl = (u: string) => {
  try { const x = new URL(u); return x.protocol === 'http:' || x.protocol === 'https:' } catch { return false }
}
export const isInteger = (v: string) => /^\d+$/.test(v)
export const normalizeMinutes = (m?: number) => (m && m > 0 ? m : 30)
export const isValidCode = (c: string) => /^[a-zA-Z0-9_-]{3,32}$/.test(c)