import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Onetime from '../../compos/plans/Onetime'
import PlanCard from '../../compos/plans/PlanCard'

function Paymentstuffs() {
    var router = useRouter()
    var session = useSession()
    var [auth, setAuth] = useState(false)
    var [useFor, setuseFor] = useState('')
    var [loading, setLoading] = useState(true)
    useEffect(() => {
        if (!!router.query.method) {
            setuseFor(router.query?.method[0])
            setLoading(false)
        }
    }, [router.query.method])

    useEffect(() => {
        if (session.status == 'unauthenticated') {
            router.push('/')
        } else {
            setAuth(true)
        }
    }, [session])

    if (loading) return null
    if (auth) {
        return (
            <div className='Paymentstuffs'>
                <Head>
                    <title>Payment | VacantXa</title>
                    <link rel="icon" href="/favicon.ico" />

                </Head>
                <h1>Payment Cart</h1>
                <div className="paypage">
                    <Onetime id={router.query.method[1]} frm={router.query.method[0]} />
                </div>
                <div className="planInfo">
                    <h2>Didn&apos;t Liked the Plan? Checkout other Plans thats suitable for You</h2>
                </div>
                <div className="pc-plans payplans">
                    <PlanCard time='1' nodir={true} id={router.query.method[1]} />
                    <PlanCard time='2' nodir={true} id={router.query.method[1]} />
                    <PlanCard time='3' nodir={true} id={router.query.method[1]} />
                </div>
            </div>
        )
    } else {
        return null
    }



}

export default Paymentstuffs