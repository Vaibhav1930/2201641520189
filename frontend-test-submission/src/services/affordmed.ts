import type { AuthCredentials } from '../types'
const BASE = 'http://20.244.56.144/evaluation-service'

export async function authenticate(creds: AuthCredentials) {
  const res = await fetch(`${BASE}/auth`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: creds.email,
      name: creds.name,
      rollNo: creds.rollNo,
      accessCode: creds.accessCode,
      clientID: creds.clientID,
      clientSecret: creds.clientSecret
    })
  })
  if (!res.ok) throw new Error(`Auth failed: ${res.status}`)
  return res.json() as Promise<{ token_type: 'Bearer'; access_token: string; expires_in: number }>
}