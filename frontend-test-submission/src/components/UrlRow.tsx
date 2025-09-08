import React from 'react'
import { Grid, TextField } from '@mui/material'

export interface RowData { url: string; minutes?: string; code?: string }
export default function UrlRow({ idx, data, onChange }: { idx: number; data: RowData; onChange: (d: RowData) => void }) {
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12} md={6}>
        <TextField label={`Long URL #${idx+1}`} value={data.url} onChange={e => onChange({ ...data, url: e.target.value })} fullWidth required/>
      </Grid>
      <Grid item xs={6} md={2}>
        <TextField label="Validity (min)" value={data.minutes ?? ''} onChange={e => onChange({ ...data, minutes: e.target.value })} placeholder="30" fullWidth />
      </Grid>
      <Grid item xs={6} md={4}>
        <TextField label="Custom Shortcode" value={data.code ?? ''} onChange={e => onChange({ ...data, code: e.target.value })} placeholder="optional" fullWidth />
      </Grid>
    </Grid>
  )
}