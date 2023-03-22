import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import Jobcard from '../orgn/Jobcard'
import Jobcards from './Jobcard'
import SaveCard from './SaveCard'

function Saved() {
    var session = useSession()
    var [loading, setLoading] = useState(true)
    var [jobs, setJobs] = useState([])
    function getJobs(e) {
        fetch('/api/user/jobs/bySaved', {
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

    function mapJob() {
        for (let i = 0; i < jobs.length; i++) {
            console.log(jobs[i])
            return (
                <SaveCard id={jobs[i]} key={i} />
            )
        }
    }



    useEffect(() => {
        if (session.status == "authenticated") {
            getJobs(session.data?.user.email)

        } else if (session.status == "unauthenticated") {
            router.push("/login")
        } else if (session.status == "loading") {
            console.log("loading")

        }
    }, [session.status])
    return (
        <div className='matchJob'>
            <h2>These are the jobs you have saved before.</h2>
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
                            <>
                                {jobs.map((job, index) => {
                                    return (
                                        <SaveCard id={job} key={index} />
                                    )
                                }
                                )}
                            </>
                        }
                    </>
                }
            </div>
        </div>
    )
}

export default Saved