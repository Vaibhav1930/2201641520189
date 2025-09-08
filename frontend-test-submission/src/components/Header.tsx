import React, { useState } from 'react'
import { AppBar, Toolbar, Typography, Box, IconButton, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'

export default function Header() {
  const { creds, setCreds, doAuth, token } = useAuth()
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(() => creds ?? { email: '', name: '', rollNo: '', accessCode: '', clientID: '', clientSecret: '' })

  const onSave = async () => {
    setCreds(form as any)
    await doAuth()
    setOpen(false)
  }

  return (
    <AppBar position="sticky" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }} component={Link} to="/" style={{ textDecoration:'none', color:'inherit' }}>
          Affordmed URL Shortener
        </Typography>
        <Box sx={{ mr: 2 }}><ButtonLink to="/stats">Stats</ButtonLink></Box>
        <Box sx={{ fontSize: 12, mr: 1 }}>{token ? 'Authenticated' : 'Not Authenticated'}</Box>
        <IconButton color="inherit" onClick={() => setOpen(true)} aria-label="settings"><SettingsIcon/></IconButton>
      </Toolbar>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Affordmed Test Server Credentials</DialogTitle>
        <DialogContent sx={{ display: 'grid', gap: 2, pt: 2 }}>
          {(['email','name','rollNo','accessCode','clientID','clientSecret'] as const).map(k => (
            <TextField key={k} label={k} value={(form as any)[k]} onChange={e => setForm({ ...form, [k]: e.target.value })} fullWidth />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={onSave} variant="contained">Authenticate</Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  )
}

function ButtonLink({ to, children }: any){
  return <Link to={to} style={{ color: 'white', textDecoration: 'none', fontWeight: 500 }}>{children}</Link>
}