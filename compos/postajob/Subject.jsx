import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

function Subject() {
    var router = useRouter()
    var [subject, setsubject] = useState(router.query.subject)
    var [level, setlevel] = useState(router.query.level)
    var [salary, setsalary] = useState(router.query.salary)
    var [description, setdescription] = useState(router.query.description)

    function change(e) {
        router.push({
            pathname: '/postjob',
            query: {
                subject: e,
                level: level,
                salary: salary,
                description: description
            }
        })

    }

    useEffect(() => {
        var subject = document.getElementById('subject')
        subject.value = router.query.subject

    }, [router.query.subject])



    return (
        <div className="pj-wrapper">

            <div className="pj-left">
                <div className="pj-left-top">
                    <p>1/4</p>
                    <h2>Subject</h2>
                </div>
                <div className="pj-left-bottom">
                    <h1>Lets start by selecting the subject</h1>
                </div>
            </div>

            <div className="pj-right">
                <div className="pj-right-top">
                    <h1>What&apos;s the vacant subject?</h1>
                </div>
                <div className="pj-right-bottom pjrb">
                    <div className="pjrb-subject">
                        <select name="subject" id="subject" defaultValue={"english"} onChange={(e) => change(e.target.value)}>
                            <option value="english">English</option>
                            <option value="nepali">Nepali</option>
                            <option value="math">C. Math</option>
                            <option value="science">Science</option>
                            <option value="social">Social</option>
                            <option value="computer">Computer</option>
                            <option value="account">Account</option>
                            <option value="economics">Economics</option>
                            <option value="business">Business</option>
                            <option value="biology">Biology</option>
                            <option value="physics">Physics</option>
                            <option value="chemistry">Chemistry</option>
                            <option value="history">History</option>
                            <option value="geography">Geography</option>
                            <option value="health">Health</option>
                            <option value="art">Art</option>
                            <option value="music">Music</option>
                            <option value="sports">Sports</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Subject