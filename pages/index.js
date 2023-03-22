import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import { useTheme } from 'next-themes'
import Homepage from '../compos/home/Homepage'
import Recent from '../compos/home/Recent'
import HomeOrgn from '../compos/home/HomeOrgn'
import Homesopnsor from '../compos/home/Homesopnsor'
import Footer from '../compos/Footer'
import { useEffect, useState } from 'react'
import { SessionProvider, useSession } from 'next-auth/react'
import Dashboard from '../compos/Loggedin/orgn/Dashboard'
import TeacherDash from '../compos/Loggedin/teacher/Dashboard'
import Newjobs from '../compos/home/Newjobs'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  var session = useSession()
  var [sessionData, setSessionData] = useState({})

  var [auth, setAuth] = useState(false)
  var [loading, setLoading] = useState(true)
  var [type, setType] = useState('')
  var [user, setUser] = useState({})

  function getUser(email) {
    setLoading(true)
    if (email) {
      fetch('/api/user/getUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email })
      }).then(res => res.json()).then(data => {
        setType(data.data.type)
        setLoading(false)
        setUser(data.data)
      })
    }
  }

  useEffect(() => {
    if (session.status === 'authenticated') {
      console.log('authenticated')
      setSessionData(session.data?.user)
      getUser(session.data?.user?.email)
      setAuth(true)
      setLoading(false)
    } else if (session.status === 'unauthenticated') {
      console.log('not authenticated')
      setAuth(false)
      setLoading(false)
    } else {
      console.log('loading')

    }
  }, [session])




  return (
    <>
      <Head>
        <title>Vacantxa | Home</title>
        <meta name="description" content="vacantxa | Home" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!loading && <main>
        {auth ?
          <>
            {type === 'Organization' &&
              <>
                <Dashboard user={user} />
              </>
            }
            {type === 'Teacher' &&
              <>
                <TeacherDash user={user} />
              </>
            }
          </>
          : <>
            <Homepage />
            <Homesopnsor />
            <HomeOrgn />
            <Newjobs />
            <Footer />
          </>}
      </main>
      }
    </>
  )
}
