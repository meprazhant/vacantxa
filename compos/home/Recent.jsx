import React, { useEffect, useState } from 'react'
import Recentcards from './Recentcards'
import Data from './localData/jobData'
import Dashboard from '../Loggedin/teacher/Dashboard'
import { useSession } from 'next-auth/react'

function Recent() {
    var session = useSession()
    var [auth, setAuth] = useState(false)
    var [user, setUser] = useState({})
    var [type, setType] = useState('')
    var [loading, setLoading] = useState(true)
    var [sessionData, setSessionData] = useState({})
    var [data, setData] = useState(Data)
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
        <div className='recent'>
            <Dashboard user={user} />
        </div >
    )
}

export default Recent