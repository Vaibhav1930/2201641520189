import React, { useEffect, useState } from 'react'
import { Box, Card, CardContent, Chip, Divider, Grid, List, ListItem, ListItemText, Typography } from '@mui/material'
import type { ShortUrl } from '../types'
import { loadUrls } from '../utils/storage'

export default function StatsPage() {
  const [items, setItems] = useState<ShortUrl[]>([])

  useEffect(() => { setItems(loadUrls()) }, [])

  const isExpired = (u: ShortUrl) => Date.now() > u.expiresAt

  return (
    <Box className="container">
      <Typography variant="h5" gutterBottom>Short Links – Statistics</Typography>
      <Grid container spacing={2}>
        {items.map(u => (
          <Grid key={u.code} item xs={12} md={6}>
            <Card variant="outlined"><CardContent>
              <Typography variant="h6">{window.location.origin}/r/{u.code}</Typography>
              <Divider sx={{ my: 1 }} />
              <Typography sx={{ mb: 1 }} variant="body2">Original: {u.longUrl}</Typography>
              <Box sx={{ display:'flex', gap: 1, flexWrap:'wrap', mb: 1 }}>
                <Chip label={`Created: ${new Date(u.createdAt).toLocaleString()}`} />
                <Chip label={`Expires: ${new Date(u.expiresAt).toLocaleString()}`} color={isExpired(u)?'error':'default'} />
                <Chip label={`Clicks: ${u.clicks.length}`} color="primary" />
              </Box>
              <Typography variant="subtitle2">Click Details</Typography>
              <List dense>
                {u.clicks.length === 0 && <ListItem><ListItemText primary="No clicks yet" /></ListItem>}
                {u.clicks.map((c, idx) => (
                  <ListItem key={idx}>
                    <ListItemText primary={`${new Date(c.at).toLocaleString()}`} secondary={`source: ${c.source} • geo: ${c.geo}`} />
                  </ListItem>
                ))}
              </List>
            </CardContent></Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}