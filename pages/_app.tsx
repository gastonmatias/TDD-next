import '@/styles/global.css'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { AppProps } from 'next/app'
import { darkTheme } from 'theme'

export default function MyApp({ Component, pageProps }: AppProps) {
  
  const queryClient = new QueryClient()

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
