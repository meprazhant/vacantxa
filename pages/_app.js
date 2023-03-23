import '../styles/globals.css'
import { useEffect } from 'react'
import { ThemeProvider } from 'next-themes'
import Navbar from '../compos/Navbar'
import { SessionProvider } from 'next-auth/react'

export default function App({ Component, pageProps: { session, ...pageProps } }) {



  return (
    <SessionProvider session={session}>
      <ThemeProvider>
        <Navbar />
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>

  )

}
