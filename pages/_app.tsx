import '@/styles/global.css'
import { initMSW } from '@/utils/initMSW'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { AppProps } from 'next/app'
import { darkTheme } from 'theme'

export default function MyApp({ Component, pageProps }: AppProps) {
  
  const queryClient = new QueryClient()

  // ininicializa API MOCK en caso de un "yarn mock" (inicio de app en modo test con api falsa)
  if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled'){
    const shouldRender = initMSW()

    if (!shouldRender) return null
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
