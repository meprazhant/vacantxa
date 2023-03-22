import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Teacher from '../../compos/register/Teacher'

function register() {
    var router = useRouter()
    var [as, setAs] = useState("Teacher")
    useEffect(() => {
        setAs(router.query.as)
        if (as == "Teacher" || as == "Organization") {

        } else {
            router.push("./join")
        }
    })
    return (
        <div className='register'>
            <Head>
                <title>Join | {as}</title>
            </Head>
            <Teacher as={as} />
        </div>
    )
}

export default register