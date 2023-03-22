import React, { useState, useEffect } from 'react'
import Jobcards from '../Loggedin/teacher/Jobcard'

function Newjobs() {
    var [data, setData] = useState([])
    var [loading, setLoading] = useState(true)
    function fetchJob() {
        fetch('/api/user/jobs/byRecent')
            .then(res => res.json())
            .then(data => {
                console.log(data.data)
                setData(data.data)
                setLoading(false)
            })
    }
    useEffect(() => {
        fetchJob()
    }, [])

    return (
        <div className='matchJob homeJob'>
            <h2>These are some jobs posted Recently.</h2>
            <div className="mj-card">
                {loading ? <div className="mj-loading">
                    <div className="mj-loading-dot"></div>
                    <div className="mj-loading-dot"></div>
                    <div className="mj-loading-dot"></div>
                </div> :
                    <>
                        {data.length == 0 ? <div className="mj-nojob">
                            <h3>No jobs found</h3>
                        </div> :
                            data.map((job, index) => {
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

export default Newjobs