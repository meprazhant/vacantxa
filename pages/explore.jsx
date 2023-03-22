import Head from 'next/head'
import React from 'react'
import Newjobs from '../compos/home/Newjobs'
import Recent from '../compos/home/Recent'

function explore() {
    return (
        <div className='Explore'>
            <Head>
                <title>Explore Vacancy</title>
                <link rel="icon" href="/favicon.ico" />
                <meta name="description" content="Explore Vacantxa - find best jobs for teachers in nepal" />
                <meta name="keywords" content="Vacantxa, Vacantxa.com, Vacantxa.com.ng, Vacantxa.com.ng/explore, nepal teacher, teaching job near me, teaching job nepal" />
                <meta name="author" content="Vacantxa" />

            </Head>
            <Newjobs />
        </div>
    )
}

export default explore