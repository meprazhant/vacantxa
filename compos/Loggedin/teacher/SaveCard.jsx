import React, { useEffect, useState } from 'react'
import Jobcards from './Jobcard'

function SaveCard({ id }) {
    var [job, setJob] = useState({})
    var [loading, setLoading] = useState(true)
    console.log(id)
    function getjobbyid() {
        fetch('/api/job/getjob?id=' + id, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },

        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setJob(data?.job)
                setLoading(false)
            })
    }
    useEffect(() => {
        getjobbyid()
    }, [])
    return (
        <div className="jobsa">
            {(job && !loading) && <>
                <Jobcards job={job} key={"asd"} />
            </>}
            {loading && <div className="mj-loading">
                <div className="mj-loading-dot"></div>
                <div className="mj-loading-dot"></div>
                <div className="mj-loading-dot"></div>
            </div>}
            {(!job && !loading) && <div className=" res_nojob">
                <h3>Seems like the job you have saved was deleted by the job Owner.</h3>
            </div>}
        </div>
    )
}

export default SaveCard