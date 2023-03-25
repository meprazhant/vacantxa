import React, { useState } from 'react'
import { useRouter } from 'next/router'

function Description({ data }) {
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
                level: level,
                salary: salary,
                description: e
            }
        })
    }
    var [count, setCount] = useState(0)

    function countLetter(e) {
        var count = e.length
        setCount(count)
        change(e)
    }

    function write() {
        var des = `${data.name} is seeking a dynamic and passionate ${router.query.subject} teacher to join our team. The position is for teaching ${router.query.level} level students, and the successful candidate will be responsible for developing and delivering engaging and effective ${router.query.subject} language lessons.

Responsibilities:

- Create lesson plans and deliver engaging ${router.query.subject} lessons to ${router.query.level} level students
- Assess student progress and adjust teaching methods as necessary
- Provide regular feedback to students and their parents/guardians
- Collaborate with other teachers and staff to enhance the overall learning experience for students
- Maintain a safe and positive learning environment

Requirements:

- Bachelor's degree in ${router.query.subject} or related field
-Teaching certification or experience is preferred
-Excellent communication and interpersonal skills
-Strong organizational and time-management skills
-Ability to work collaboratively with other teachers and staff
-Passion for teaching and a commitment to student success

Salary:
The salary for this position is ${router.query.salary} per month, and includes benefits such as health insurance, paid time off, and professional development opportunities.

If you are a dedicated and enthusiastic ${router.query.subject} teacher with a passion for teaching ${router.query.level} level students, we encourage you to apply for this exciting opportunity at ${data.name}.`

        var desc = document.getElementById('desc')
        desc.value = des
        change(des)
    }



    return (
        <div className="pj-wrapper">

            <div className="pj-left">
                <div className="pj-left-top">
                    <p>4/4</p>
                    <h2>Description</h2>
                </div>
                <div className="pj-left-bottom">
                    <h1>Write an appropriate Description for the Post</h1>
                </div>
            </div>

            <div className="pj-right">
                <div className="pj-right-top">
                    <h1>Description shouldn&apos;t be greater than 1000 words.</h1>
                </div>
                <div className="pj-right-bottom">
                    <textarea name="desc" id="desc" defaultValue={description} onChange={(e) => countLetter(e.target.value)} cols="30" rows="10">
                        {/* {description} */}
                    </textarea>
                    <button onClick={write}>Write me a Description</button>
                    {count != 0 && count < 1000 ? <p opacity={{ opacity: 1 }}><span className='green'>{count}</span> out of 1000 Words</p> : <p style={{ opacity: 0 }}>HEHEHEH</p>}
                </div>


            </div>
        </div>
    )
}

export default Description