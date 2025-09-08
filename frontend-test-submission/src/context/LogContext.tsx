import React, { createContext, useContext, useMemo } from 'react'
import { initLogger } from 'logging-middleware'
import type { Level, Pkg, Stack } from '../types'
import { useAuth } from './AuthContext'

type LogFn = (stack: Stack, level: Level, pkg: Pkg, message: string) => void

const Ctx = createContext<LogFn | null>(null)
export const useLog = () => {
  const v = useContext(Ctx)
  if (!v) throw new Error('useLog outside provider')
  return v
}

export default function LogProvider({ children }: { children: React.ReactNode }) {
  const { token } = useAuth()
  const log = useMemo(() => initLogger({
    baseUrl: 'http://20.244.56.144/evaluation-service',
    getToken: () => token
  }), [token])
  return <Ctx.Provider value={log}>{children}</Ctx.Provider>
}