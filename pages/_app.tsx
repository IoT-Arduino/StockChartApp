import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { LayoutWrapper } from '../components/LayoutWrapper'
import { DefaultSeo } from 'next-seo'
import SEO from '../next-seo.config'

// import { Session, User } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabase'
import { UserContext } from '../utils/UserContext'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import { MantineProvider } from '@mantine/core'

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState(supabase.auth.user())
  const [session, setSession] = useState(supabase.auth.session()) // 変更した。
  useEffect(() => {
    const session = supabase.auth.session()
    setSession(session)
    setUser(session?.user ?? null)
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
    })

    return () => {
      authListener?.unsubscribe()
    }
  }, [])

  return (
    <UserContext.Provider value={{ user, session }}>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <DefaultSeo {...SEO} />
        <LayoutWrapper>
          <Component {...pageProps} />
        </LayoutWrapper>
      </MantineProvider>
    </UserContext.Provider>
  )
}

export default MyApp
