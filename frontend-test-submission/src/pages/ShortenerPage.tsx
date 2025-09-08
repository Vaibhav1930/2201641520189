import React, { useMemo, useState } from 'react'
import { Box, Button, Card, CardContent, Divider, Grid, Snackbar, Alert, Typography, Link as MLink } from '@mui/material'
import UrlRow, { RowData } from '../components/UrlRow'
import CopyField from '../components/CopyField'
import { isInteger, isValidCode, isValidUrl, normalizeMinutes } from '../utils/validation'
import { loadUrls, saveUrls } from '../utils/storage'
import type { ShortUrl } from '../types'
import { Link } from 'react-router-dom'
import { useLog } from '../context/LogContext'

export default function ShortenerPage() {
  const log = useLog()
  const [rows, setRows] = useState<RowData[]>([{ url: '' }, { url: '' }, { url: '' }, { url: '' }, { url: '' }])
  const [snack, setSnack] = useState<{open: boolean; msg: string; type: 'success'|'error'|'warning'|'info'}>({open:false, msg:'', type:'info'})
  const [results, setResults] = useState<ShortUrl[]>([])
  const existing = useMemo<ShortUrl[]>(() => loadUrls(), [])

  const codeExists = (code: string) => existing.some(u => u.code === code) || results.some(u => u.code === code)
  const genCode = () => Math.random().toString(36).slice(2, 8)

  const handleShorten = () => {
    const toCreate: ShortUrl[] = []

    for (const r of rows.filter(r => r.url.trim())) {
      if (!isValidUrl(r.url)) {
        setSnack({ open: true, msg: `Invalid URL: ${r.url}`, type: 'error' })
        log('frontend','error','component',`invalid url ${r.url}`)
        return
      }
      if (r.minutes && !isInteger(r.minutes)) {
        setSnack({ open: true, msg: `Validity must be an integer for ${r.url}` , type: 'error' })
        log('frontend','error','component',`invalid validity ${r.minutes}`)
        return
      }
      let code = r.code?.trim() || ''
      if (code) {
        if (!isValidCode(code)) {
          setSnack({ open: true, msg: `Invalid shortcode format: ${code}`, type: 'error' })
          log('frontend','error','component',`invalid shortcode ${code}`)
          return
        }
        if (codeExists(code)) {
          setSnack({ open: true, msg: `Shortcode already exists: ${code}`, type: 'error' })
          log('frontend','warn','component',`shortcode exists ${code}`)
          return
        }
      } else {
        do { code = genCode() } while (codeExists(code))
      }

      const now = Date.now()
      const minutes = normalizeMinutes(r.minutes ? Number(r.minutes) : undefined)
      toCreate.push({ code, longUrl: r.url.trim(), createdAt: now, expiresAt: now + minutes * 60000, clicks: [] })
    }

    if (!toCreate.length) {
      setSnack({ open: true, msg: 'Please enter at least one URL', type: 'warning' })
      return
    }

    const merged = [...existing, ...toCreate]
    saveUrls(merged)
    setResults(toCreate)
    log('frontend','info','page',`created ${toCreate.length} short urls`)
  }

  const base = window.location.origin

  return (
    <Box className="container">
      <Card variant="outlined"><CardContent>
        <Typography variant="h6" gutterBottom>Shorten up to 5 URLs</Typography>
        <Grid container spacing={2}>
          {rows.map((row, i) => (
            <Grid item xs={12} key={i}>
              <UrlRow idx={i} data={row} onChange={d => setRows(prev => prev.map((r, idx) => idx===i?d:r))} />
            </Grid>
          ))}
        </Grid>
        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <Button variant="contained" onClick={handleShorten}>Create Short Links</Button>
          <Button variant="outlined" onClick={() => setRows([{ url: '' }, { url: '' }, { url: '' }, { url: '' }, { url: '' }])}>Reset</Button>
        </Box>
      </CardContent></Card>

      {!!results.length && (
        <Card sx={{ mt: 3 }} variant="outlined"><CardContent>
          <Typography variant="h6">Results</Typography>
          <Divider sx={{ my: 2 }} />
          <Grid container spacing={2}>
            {results.map(r => (
              <Grid key={r.code} item xs={12} md={6}>
                <CopyField label="Short URL" value={`${base}/r/${r.code}`} />
                <Box sx={{ display:'flex', gap: 2, mt: 1 }}>
                  <MLink component={Link} to={`/r/${r.code}`}>Test Redirect</MLink>
                  <MLink component={Link} to="/stats">View Stats</MLink>
                </Box>
                <Box sx={{ mt: 1, fontSize: 12 }}>Expires: {new Date(r.expiresAt).toLocaleString()}</Box>
                <Box sx={{ fontSize: 12 }}>Original: {r.longUrl}</Box>
              </Grid>
            ))}
          </Grid>
        </CardContent></Card>
      )}

      <Snackbar open={snack.open} autoHideDuration={3000} onClose={() => setSnack(s => ({...s, open:false}))}>
        <Alert severity={snack.type} onClose={() => setSnack(s => ({...s, open:false}))}>{snack.msg}</Alert>
      </Snackbar>
    </Box>
  )
}