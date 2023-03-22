import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

function Salary() {
    var router = useRouter()
    var [subject, setsubject] = useState(router.query.subject)
    var [salary, setsalary] = useState(router.query.salary)
    var [level, setlevel] = useState(router.query.level)
    var [description, setdescription] = useState(router.query.description)
    function change(e) {
        router.push({
            pathname: '/postjob',
            query: {
                subject: subject,
                level: level,
                salary: e,
                description: description

            }
        })
    }

    useEffect(() => {
        var salary = document.getElementById('salary')
        salary.value = router.query.salary
    }, [router.query.salary])

    return (
        <div className="pj-wrapper">

            <div className="pj-left">
                <div className="pj-left-top">
                    <p>3/4</p>
                    <h2>Salary</h2>
                </div>
                <div className="pj-left-bottom">
                    <h1>What&apos;s the salary you can provide to Your Teacher?</h1>
                </div>
            </div>

            <div className="pj-right">
                <div className="pj-right-top">
                    <h1>What&apos;s your Salary Schema?</h1>
                </div>
                <div className="pj-right-bottom salaryBTN">
                    <p>Rs.</p>
                    <input type="number" id='salary' placeholder='30000' onChange={(e) => change(e.target.value)} />
                </div>


            </div>
        </div>
    )
}

export default Salary