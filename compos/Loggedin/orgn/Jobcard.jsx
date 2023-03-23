import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'



function Jobcard({ job }) {
    var [time, setTime] = useState(0)
    var [applied, setApplied] = useState(0)
    var router = useRouter()

    function timeSince() {
        var time = new Date(job.postedOn).toLocaleDateString()

        if (time == new Date().toLocaleDateString()) {
            time = "Today"
        }
        if (time == new Date(new Date().setDate(new Date().getDate() - 1)).toLocaleDateString()) {
            time = "Yesterday"
        }
        if (time == new Date(new Date().setDate(new Date().getDate() - 2)).toLocaleDateString()) {
            time = "2 days ago"
        }
        if (time == new Date(new Date().setDate(new Date().getDate() - 3)).toLocaleDateString()) {
            time = "3 days ago"
        }
        if (time == new Date(new Date().setDate(new Date().getDate() - 4)).toLocaleDateString()) {
            time = "4 days ago"
        }
        if (time == new Date(new Date().setDate(new Date().getDate() - 5)).toLocaleDateString()) {
            time = "5 days ago"
        }
        if (time == new Date(new Date().setDate(new Date().getDate() - 6)).toLocaleDateString()) {
            time = "6 days ago"
        }
        if (time == new Date(new Date().setDate(new Date().getDate() - 7)).toLocaleDateString()) {
            time = "7 days ago"
        }
        // week ago
        if (time == new Date(new Date().setDate(new Date().getDate() - 8)).toLocaleDateString()) {
            time = "1 week ago"
        }
        if (time == new Date(new Date().setDate(new Date().getDate() - 15)).toLocaleDateString()) {
            time = "2 weeks ago"
        }
        if (time == new Date(new Date().setDate(new Date().getDate() - 22)).toLocaleDateString()) {
            time = "3 weeks ago"
        }
        if (time == new Date(new Date().setDate(new Date().getDate() - 29)).toLocaleDateString()) {
            time = "4 weeks ago"
        }
        // month ago

        if (time == new Date(new Date().setDate(new Date().getDate() - 30)).toLocaleDateString()) {
            time = "1 month ago"
        }
        if (time == new Date(new Date().setDate(new Date().getDate() - 60)).toLocaleDateString()) {
            time = "2 months ago"
        }
        if (time == new Date(new Date().setDate(new Date().getDate() - 90)).toLocaleDateString()) {
            time = "3 months ago"
        }
        // year ago

        if (time == new Date(new Date().setDate(new Date().getDate() - 365)).toLocaleDateString()) {
            time = "1 year ago"
        }
        if (time == new Date(new Date().setDate(new Date().getDate() - 730)).toLocaleDateString()) {
            time = "2 years ago"
        }
        if (time == new Date(new Date().setDate(new Date().getDate() - 1095)).toLocaleDateString()) {
            time = "3 years ago"
        }

        var hour_min = new Date(job.postedOn).toLocaleTimeString()
        time = time + " at " + hour_min

        setTime(time)
    }
    function getApplied() {
        if (!job.applies) {
            setApplied(0)
        } else {
            setApplied(job.applies?.length)
        }
    }
    useEffect(() => {
        getApplied()
        timeSince()

    }, [])
    function navigateApply() {
        router.push(`/applicants/${job._id}`)
    }

    function edit() {
        router.push({
            pathname: '/',
            query: {
                id: job._id,
                action: 'edit'
            }
        })
    }

    return (
        <div className=' cdws-job'>
            <div className="cdws-job-info">
                <p>Posted for {job.subject} teacher on {time}, for {job.level} level with salary NRS. {job.salary}</p>
            </div>
            <div className="cdws-job-btn">
                <button onClick={navigateApply}>{applied} applies for this Job</button>
                <button onClick={edit}>Edit</button>
            </div>
        </div>
    )
}

export default Jobcard