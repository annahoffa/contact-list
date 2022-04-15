import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'
import React from 'react'
import { ThemeProvider } from '@mui/material/styles'
import theme from '../assets/theme'
import UsersProvider from '../providers/UsersProvider'

const queryClient = new QueryClient()

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <UsersProvider>{React.createElement(Component, pageProps)}</UsersProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </>
)

export default MyApp
