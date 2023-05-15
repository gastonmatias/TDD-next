import '@/styles/global.css'
import { CssBaseline, ThemeProvider } from '@mui/material'
import type { AppProps } from 'next/app'
import { darkTheme } from 'theme'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={darkTheme}>
       {/* <CssBaseline /> inside of the <ThemeProvider> component will also 
       enable dark mode for the app's background. */}
       <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
