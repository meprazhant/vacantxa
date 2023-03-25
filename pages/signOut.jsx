import React, { useEffect, useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/router'

function signOhut() {
    var session = useSession()
    var router = useRouter()

    function sighout() {
        signOut()
    }
    var [no, setNo] = useState()
    useEffect(() => {
        if (session.status == 'authenticated')
            sighout()
        else if (session.status == 'unauthenticated')
            router.push('/')


    }, [session.status])


    return (
        <div>Redirecting</div>
    )
}

export default signOhut