import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

function Editjob() {
    var router = useRouter()
    var [loading, setLoading] = useState(true)
    var [job, setJob] = useState({})
    function exit() {
        router.push('/')
    }

    function getJob() {
        fetch('/api/job/getjob?id=' + router.query?.id)
            .then(res => res.json())
            .then(data => {
                setLoading(false)
                setJob(data.job)
                matchJob(data.job)
            }
            )
    }

    function matchJob(a) {
        setTimeout(() => {
            document.querySelector('#subject').value = a.subject
            document.querySelector('#salary').value = a.salary
            document.querySelector('#description').value = a.desc
            document.querySelector('#' + a.level.toLowerCase()).checked = true
        }, 500)
    }

    useEffect(() => {
        getJob()
    }, [])

    function edit() {
        var subject = document.querySelector('#subject').value
        var salary = document.querySelector('#salary').value
        var desc = document.querySelector('#description').value
        var level = document.querySelector('input[name="level"]:checked').value
        var docs = {
            subject,
            salary,
            desc,
            level
        }
        fetch("/api/job/editJob?id=" + router.query?.id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(docs),
        })
            .then(res => res.json())
            .then(data => {
                if (data.message == 'Updated') {
                    router.push("/")
                }
            })
    }

    function del() {
        fetch("/api/job/deleteJob?id=" + router.query?.id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data.message == 'Deleted') {
                    router.push("/")
                }
            })
    }



    return (
        <div className='j-card'>
            <div className="j-card-top">
                <h2>Edit Job Details</h2>
                <div className="close" onClick={exit}>
                    X
                </div>
            </div>
            {(loading) && <div className='j-card'>
                <div className="homeLoad">
                    <div className="mj-loading">
                        <div className="mj-loading-dot"></div>
                        <div className="mj-loading-dot"></div>
                        <div className="mj-loading-dot"></div>
                    </div>
                </div>
            </div>
            }
            {(!loading) && <div className="j-card-body">
                <div className="j-input">
                    <label htmlFor="subject">Subject</label>
                    <select name="subject" id="subject">
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

                <div className="j-input">
                    <label htmlFor="salary">Salary</label>
                    <input type="text" name="salary" id="salary" />
                </div>
                <div className="j-input">
                    <label htmlFor="description">Description</label>
                    <textarea name="description" id="description" cols="30" rows="10"></textarea>

                </div>
                <div className="j-input">
                    <label htmlFor="level">Level</label>
                    <div className="pj-right-bottom">
                        <div className="pjb-group">
                            <label htmlFor="montesory">Montesory</label>
                            <input type="radio" id='montesory' name='level' value={"Montesory"} />
                        </div>
                        <div className="pjb-group">
                            <label htmlFor="primary">Primary</label>
                            <input type="radio" id='primary' name='level' value={"Primary"} />
                        </div>
                        <div className="pjb-group">
                            <label htmlFor="secondary">Secondary</label>
                            <input type="radio" id='secondary' name='level' value={"Secondary"} />
                        </div>
                        <div className="pjb-group">
                            <label htmlFor="higher">Higher</label>
                            <input type="radio" id='higher' name='level' value={"Higher Secondary"} />
                        </div>
                        <div className="pjb-group">
                            <label htmlFor="bachelor">Bachelor</label>
                            <input type="radio" id='bachelor' name='level' value={"Bachelor"} />
                        </div>
                        <div className="pjb-group">
                            <label htmlFor="master">Master</label>
                            <input type="radio" id='master' name='level' value={"Master"} />
                        </div>
                    </div>
                </div>
                <div className="j-btn">
                    <button onClick={edit}>Save</button>
                    <button onClick={del}>Delete</button>
                </div>
            </div>}
        </div>
    )
}

export default Editjob