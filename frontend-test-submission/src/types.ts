export type Stack = 'backend' | 'frontend'
export type Level = 'debug' | 'info' | 'warn' | 'error' | 'fatal'
export type Pkg =
  | 'cache' | 'controller' | 'cron_job' | 'db' | 'domain' | 'handler' | 'repository' | 'route' | 'service'
  | 'api'
  | 'auth' | 'config' | 'middleware' | 'utils' | 'component' | 'hook' | 'page' | 'state' | 'style'

export interface ShortUrl {
  code: string
  longUrl: string
  createdAt: number
  expiresAt: number
  clicks: ClickLog[]
}

export interface ClickLog {
  at: number
  source: string
  geo: string
}

export interface AuthCredentials {
  email: string
  name: string
  rollNo: string
  accessCode: string
  clientID: string
  clientSecret: string
}