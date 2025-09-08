import React from 'react'
import { useRoutes } from 'react-router-dom'
import { routes } from './routes'
import Header from './components/Header'
import AuthProvider from './context/AuthContext'
import LogProvider from './context/LogContext'
import { Container } from '@mui/material'

export default function App() {
  const element = useRoutes(routes)
  return (
    <AuthProvider>
      <LogProvider>
        <Header />
        <Container maxWidth="lg" sx={{ py: 3 }}>
          {element}
        </Container>
      </LogProvider>
    </AuthProvider>
  )
}