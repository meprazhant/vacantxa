import Head from 'next/head'
import React, { useState, useEffect } from 'react'
import { getSession } from 'next-auth/react'

function test({ }) {
    function fetchs() {
        fetch("/api/user/test?email=" + document.getElementById('search').value)
            .then(res => res.json())
            .then(data => {
                console.log(data)
            }
            )
    }


    return (
        <div className='test'>
            <Head>
                <title>Test</title>
            </Head>
            <div className="searchUser">
                <h2>Search User According to Their Email</h2>
                <input type="text" id='search' />
                <button onClick={fetchs}>Search</button>
            </div>
        </div>
    )
}

export default test

