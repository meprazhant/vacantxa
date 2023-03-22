import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import Jobcard from './Jobcard'

function Dashboard() {
    var session = useSession()
    var router = useRouter()
    var [name, setname] = useState("----")
    var [user, setUser] = useState({})
    var [loading, setLoading] = useState(true)
    var [jobs, setJobs] = useState([])
    var [jobEmpty, setJobEmpty] = useState(false)

    function getJobs() {
        var email = session.data.user.email
        fetch('/api/user/clientJob', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        })
            .then(res => res.json())
            .then(data => {
                if (data.data.length == 0) {
                    setJobs([])
                    setJobEmpty(true)
                } else {
                    var revdata = data.data?.reverse()
                    setJobs(revdata)
                }
            }
            )
            .catch(err => {
                console.log(err)
            }
            )
    }

    function getUser() {
        fetch('/api/user/getUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: session.data.user.email }),
        })
            .then(res => res.json())
            .then(data => {
                setUser(data.data)
                var first_name = data.data.name.split(" ")[0]
                setname(first_name)
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        if (session.status == "loading") {
            // Loading
        } else if (session.status == "authenticated") {
            // Authenticated
            getUser()
            getJobs()
        } else if (session.status == "unauthenticated") {
            router.push("/auth/join")
        }
    }, [session])

    return (
        <>
            <Head>
                <title>Your Dashboard | vacantXa</title>

            </Head>
            {!loading && <div className='clientDash'>
                <div className="cd-top">
                    <h2>Hi, {name} 👋</h2>
                </div>
                <div className="cd-wspace">
                    <div className="cdws-data">
                        <h4>Your Workspace</h4>
                        <div className="cd-wspace-btn">
                            <button onClick={() => router.push("/postjob")}>Post a Job</button>
                            <button>Browse Teachers</button>
                        </div>
                    </div>
                    <div className="cd-cards">
                        <div className="cdws-card">
                            <p>Information</p>
                            <p>You can see those who have applied, edit your Job details, delete or update them, all from your dashboard</p>
                            <div className="cdws-img">
                                <div className="cd-imgarea"></div>
                            </div>
                        </div>
                        {jobs.map((job, index) => {
                            return <Jobcard job={job} key={index} />
                        })
                        }

                    </div>

                </div>


            </div>}
        </>
    )
}

export default Dashboard