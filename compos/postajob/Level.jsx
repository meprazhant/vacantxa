import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

function Level() {
    var router = useRouter()
    var [subject, setsubject] = useState(router.query.subject)
    var [level, setlevel] = useState(router.query.level)
    var [salary, setsalary] = useState(router.query.salary)
    var [description, setdescription] = useState(router.query.description)
    function change(e) {
        router.push({
            pathname: '/postjob',
            query: {
                subject: subject,
                level: e,
                salary: salary,
                description: description
            }
        })
    }

    function check() {
        var pjb = document.querySelectorAll('.pjb-group input')
        for (var i = 0; i < pjb.length; i++) {
            if (pjb[i].value === router.query.level) {
                pjb[i].checked = true
            }
        }
    }
    useEffect(() => {
        check()
    }, [router.query.level])

    return (
        <div className="pj-wrapper">

            <div className="pj-left">
                <div className="pj-left-top">
                    <p>2/4</p>
                    <h2>Level</h2>
                </div>
                <div className="pj-left-bottom">
                    <h1>Lets start by selecting the subject</h1>
                </div>
            </div>

            <div className="pj-right">
                <div className="pj-right-top">
                    <h1>What&apos;s the vacant Level?</h1>
                </div>
                <div className="pj-right-bottom">
                    <div className="pjb-group">
                        <label htmlFor="montesory">Montesory</label>
                        <input onChange={(e) => change(e.target.value)} type="radio" id='montesory' name='level' value={"Montesory"} />
                    </div>
                    <div className="pjb-group">
                        <label htmlFor="primary">Primary</label>
                        <input onChange={(e) => change(e.target.value)} type="radio" id='primary' name='level' value={"Primary"} />
                    </div>
                    <div className="pjb-group">
                        <label htmlFor="secondary">Secondary</label>
                        <input onChange={(e) => change(e.target.value)} type="radio" id='secondary' name='level' value={"Secondary"} />
                    </div>
                    <div className="pjb-group">
                        <label htmlFor="higher">Higher Secondary</label>
                        <input onChange={(e) => change(e.target.value)} type="radio" id='higher' name='level' value={"Higher Secondary"} />
                    </div>
                    <div className="pjb-group">
                        <label htmlFor="bachelor">Bachelor</label>
                        <input onChange={(e) => change(e.target.value)} type="radio" id='bachelor' name='level' value={"Bachelor"} />
                    </div>
                    <div className="pjb-group">
                        <label htmlFor="master">Master</label>
                        <input onChange={(e) => change(e.target.value)} type="radio" id='master' name='level' value={"Master"} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Level