const KEY = 'affordmed.urls.v1'
const AUTH_KEY = 'affordmed.auth.v1'

export function loadUrls() {
  try { return JSON.parse(localStorage.getItem(KEY) || '[]') } catch { return [] }
}
export function saveUrls(urls: any) { localStorage.setItem(KEY, JSON.stringify(urls)) }

export function loadAuth() {
  try { return JSON.parse(localStorage.getItem(AUTH_KEY) || 'null') } catch { return null }
}
export function saveAuth(auth: any) { localStorage.setItem(AUTH_KEY, JSON.stringify(auth)) }