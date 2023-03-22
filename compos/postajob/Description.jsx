import React, { useState } from 'react'
import { useRouter } from 'next/router'

function Description() {
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
                    {count != 0 && count < 1000 ? <p opacity={{ opacity: 1 }}><span className='green'>{count}</span> out of 1000 Words</p> : <p style={{ opacity: 0 }}>HEHEHEH</p>}
                </div>


            </div>
        </div>
    )
}

export default Description