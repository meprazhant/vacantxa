import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import Jobcard from '../orgn/Jobcard'
import Jobcards from './Jobcard'
import SaveCard from './SaveCard'
import { useRouter } from 'next/router'

function Matchjobs() {
    var router = useRouter()
    var session = useSession()
    var [loading, setLoading] = useState(true)
    var [jobs, setJobs] = useState([])
    function getJobs(e) {
        console.log(e)
        fetch('/api/user/jobs/bymatch', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: e
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setJobs(data?.data)
                setLoading(false)
            }
            )
    }
    useEffect(() => {
        if (session.status == "authenticated") {
            getJobs(session.data?.user.email)

        } else if (session.status == "unauthenticated") {
            router.push("/")
        } else if (session.status == "loading") {
            console.log("loading")

        }
    }, [session.status])
    return (
        <div className='matchJob'>
            <h2>Browse jobs that match your experience to a client's preferences.</h2>
            <div className="mj-card">
                {loading ? <div className="mj-loading">
                    <div className="mj-loading-dot"></div>
                    <div className="mj-loading-dot"></div>
                    <div className="mj-loading-dot"></div>
                </div> :
                    <>
                        {jobs.length == 0 ? <div className="mj-nojob">
                            <h3>No jobs found</h3>
                        </div> :
                            jobs.map((job, index) => {
                                return (
                                    <Jobcards job={job} key={index} />
                                )
                            })
                        }
                    </>

                }
            </div>
        </div>
    )
}

export default Matchjobs