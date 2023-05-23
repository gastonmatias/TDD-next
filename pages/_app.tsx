import { server } from '@/mocks/server'
import '@/styles/global.css'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { AppProps } from 'next/app'
import { darkTheme } from 'theme'

export default function MyApp({ Component, pageProps }: AppProps) {
  
  const queryClient = new QueryClient()

  if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
    // require('../mocks')
    // require('@/mocks')
    require('../mocks')
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <QueryClientProvider client={queryClient}>

       {/* <CssBaseline /> inside of the <ThemeProvider> component will also 
       enable dark mode for the app's background. */}
       <CssBaseline />
      <Component {...pageProps} />
       </QueryClientProvider>
    </ThemeProvider>
  )
}
