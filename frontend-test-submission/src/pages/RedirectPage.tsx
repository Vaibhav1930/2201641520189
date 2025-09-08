import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { loadUrls, saveUrls } from '../utils/storage'
import { useLog } from '../context/LogContext'

export default function RedirectPage() {
  const { code } = useParams<{ code: string }>()
  const log = useLog()

  useEffect(() => {
    const urls = loadUrls()
    const idx = urls.findIndex((u: any) => u.code === code)
    if (idx === -1) {
      log('frontend','warn','route',`redirect unknown code ${code}`)
      return
    }
    const u = urls[idx]
    const now = Date.now()
    if (now > u.expiresAt) {
      log('frontend','warn','route',`expired code ${code}`)
      alert('Link expired.')
      return
    }
    const source = document.referrer || 'direct'
    const geo = Intl.DateTimeFormat().resolvedOptions().timeZone || 'unknown'
    u.clicks.push({ at: now, source, geo })
    urls[idx] = u
    saveUrls(urls)
    log('frontend','info','route',`redirect ${code} -> ${u.longUrl}`)
    window.location.href = u.longUrl
  }, [code])

  return <div style={{ padding: 24 }}>Redirecting…</div>
}