import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { LayoutWrapper } from '../components/LayoutWrapper'
import { DefaultSeo } from 'next-seo'
import SEO from '../next-seo.config'

import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import axios from 'axios'

// import { Session, User } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabase'
import { UserContext } from '../utils/UserContext'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import { MantineProvider } from '@mantine/core'

// for GTM
import Script from 'next/script'
import { GTM_ID, pageview } from '../utils/gtm'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
})

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState(supabase.auth.user())
  const [session, setSession] = useState(supabase.auth.session())
  const [rank, setRank] = useState('')

  useEffect(() => {
    axios.post('/api/setSupabaseCookie', {
      event: user ? 'SIGNED_IN' : 'SIGNED_OUT',
      session: supabase.auth.session(),
    })
    if (user) {
      getProfile()
    }
  }, [user])

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

  const getProfile = async () => {
    const { data, error } = await supabase.from('profiles').select('*')
    if (error) {
      throw new Error(error.message)
    }
    setRank(data[0]?.rank)
    return data
  }

  // const router = useRouter()
  // useEffect(() => {
  //   router.events.on('routeChangeComplete', pageview)
  //   return () => {
  //     router.events.off('routeChangeComplete', pageview)
  //   }
  // }, [router.events])

  return (
    <QueryClientProvider client={queryClient}>
      <UserContext.Provider value={{ user, session, rank }}>
        <MantineProvider withGlobalStyles withNormalizeCSS>
          {/* Google Tag Manager - Global base code */}
          <Script
            id='gtag-base'
            strategy='afterInteractive'
            dangerouslySetInnerHTML={{
              __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer', '${GTM_ID}');
          `,
            }}
          />
          <DefaultSeo {...SEO} />
          <LayoutWrapper>
            <Component {...pageProps} />
          </LayoutWrapper>
        </MantineProvider>
      </UserContext.Provider>
    </QueryClientProvider>
  )
}

export default MyApp
