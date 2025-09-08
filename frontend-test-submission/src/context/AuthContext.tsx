import React, { createContext, useContext, useMemo, useState } from 'react'
import type { AuthCredentials } from '../types'
import { authenticate } from '../services/affordmed'
import { loadAuth, saveAuth } from '../utils/storage'

interface AuthState {
  token: string | null
  creds: AuthCredentials | null
  setCreds: (c: AuthCredentials) => void
  doAuth: () => Promise<void>
}

const Ctx = createContext<AuthState | null>(null)
export const useAuth = () => {
  const v = useContext(Ctx)
  if (!v) throw new Error('useAuth outside provider')
  return v
}

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [creds, setCredsState] = useState<AuthCredentials | null>(loadAuth() ?? {
    email: "Vaibhavmishra71930@gmail.com",
    name: "Vaibhav Mishra",
    rollNo: "2201641520189",
    accessCode: "sAWTuR",
    clientID: "",
    clientSecret: ""
  })
  const [token, setToken] = useState<string | null>(null)

  const setCreds = (c: AuthCredentials) => { setCredsState(c); saveAuth(c) }

  const doAuth = async () => {
    if (!creds) throw new Error('Missing credentials')
    const res = await authenticate(creds)
    setToken(res.access_token)
  }

  const value = useMemo(() => ({ token, creds, setCreds, doAuth }), [token, creds])
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}