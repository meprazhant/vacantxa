import React from 'react'
import { useRouter } from 'next/router'

function JobDone() {
    var router = useRouter()
    function goback(a) {
        router.push({
            pathname: '/postjob',
            query: {
                subject: router.query.subject,
                level: router.query.level,
                salary: router.query.salary,
                description: router.query.description,
                number: a
            }
        })
    }
    return (
        <div className='JobDone'>
            <div className="jd-card">
                <div className="jd-card-top">
                    <h1>Review Once Before Posting The Job</h1>
                </div>
                <div className="jd-card-bottom">
                    <div className="jd-data">
                        <h1>Subject</h1>
                        {(router.query.subject) ? <p>{router.query.subject}</p> : <p><font color='red'>EMPTY</font></p>}
                        <button onClick={() => goback(0)}>Edit</button>
                    </div>
                    <div className="jd-data">
                        <h1>Level</h1>
                        {(router.query.level) ? <p>{router.query.level}</p> : <p><font color='red'>EMPTY</font></p>}
                        <button onClick={() => goback(1)}>Edit</button>
                    </div>
                    <div className="jd-data">
                        <h1>Salary</h1>
                        {(router.query.salary) ? <p>{router.query.salary}</p> : <p><font color='red'>EMPTY</font></p>}
                        <button onClick={() => goback(2)}>Edit</button>
                    </div>
                    <div className="jd-data">
                        <h1>Description</h1>
                        {(router.query.description) ? <p>{router.query.description}</p> : <p><font color='red'>EMPTY</font></p>}
                        <button onClick={() => goback(3)}>Edit</button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default JobDone