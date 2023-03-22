import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSession } from "next-auth/react"
import Head from 'next/head'
import { RiContrastDropLine } from 'react-icons/ri'

saveData.getInitialProps = async (ctx) => {
    return {
        query: ctx.query
    }
}


function saveData(ctx) {
    var session = useSession()
    var [data, setData] = useState({})
    var [userData, setUserData] = useState({})
    var router = useRouter()
    var [loading, setLoading] = useState(true)


    function savestuff(datx) {

        fetch("/api/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                data: datx,
                provider: ctx.query.provi,
                type: ctx.query.as
            })
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                setUserData(res.data)
                if (ctx.query.type == 'register' && res.data?.phone && res.data?.address) {
                    router.push("/")
                    return
                }
                if (res.data) {
                    changeText(res?.data)
                    setLoading(false)
                    changeQual(res?.data?.qualification)
                }
            })
            .catch(err => {
                console.log(err)
            }
            )
    }
    function changeQual(quals) {
        var text = document.querySelectorAll(".rq-input input")
        for (var i = 0; i < text.length; i++) {
            if (!!quals[text[i].id])
                text[i].value = quals[text[i]?.id]
        }

    }


    function changeText(data) {

        var text = document.querySelectorAll(".rc-body input")
        for (var i = 0; i < text.length; i++) {
            if (!!data[text[i].id])
                text[i].value = data[text[i]?.id]
        }
    }

    function save() {
        var text = document.querySelectorAll(".rc-body input")
        for (var i = 0; i < text.length; i++) {
            text[i].style.border = "1px solid var(--gra2)"
            if (!text[i].value) {
                if (text[i].name == "qual") {
                    continue
                } else {
                    text[i].style.border = "1px solid red"
                    return
                }
            }
        }
        var data = {}
        var qualification = [{}]
        for (var i = 0; i < text.length; i++) {
            data[text[i].id] = text[i].value
            if (text[i].name == "qual") {
                qualification[0][text[i].id] = text[i].value
            }
        }

        fetch("/api/user/step2", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                data: data,
                Qualification: qualification,
            })
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if (res.message == 'User registered successfully') {

                    router.push("/")
                }
            })
    }
    var [text, setText] = useState(ctx.query.as)

    useEffect(() => {
        if (session.status == "authenticated") {
            setData(session.data.user)
            savestuff(session.data.user)
        } else {

        }

    }, [session.status])

    if (loading) {
        return (<>

        </>
        )
    }
    if (!loading)
        return (
            <div>
                <Head>
                    <title>Register | Almost Done</title>

                </Head>
                <div className="regData">
                    <div className="regDataCard">
                        <div className="regDataCardHead">
                            <div className="rd-step ">
                                <div className="rd-step-num">
                                    1
                                </div>
                                <div className="rd-step-text">
                                    Register
                                </div>

                            </div>
                            <div className="rd-step rd-active">
                                <div className="rd-step-num">
                                    2
                                </div>
                                <div className="rd-step-text">
                                    Add Details
                                </div>

                            </div>
                            <div className="rd-step">
                                <div className="rd-step-num">
                                    3
                                </div>
                                <div className="rd-step-text">
                                    Post Job
                                </div>

                            </div>
                        </div>
                        <div className="regDataCardBody">
                            <div className="rc-head">
                                <p>Step 2</p>
                                <h2>Add Details</h2>
                                <p>Enter the following details and you are done registering</p>
                            </div>
                            <div className="rc-body">
                                <div className="rc-input">
                                    <label htmlFor="name">Name Of {text} </label>
                                    <input type="text" name="name" id="name" />
                                </div>
                                <div className="rc-input">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" name="email" id="email" readOnly />
                                </div>
                                <div className="rc-input">
                                    <label htmlFor="phone">Phone</label>
                                    <input type="number" name="phone" id="phone" />
                                </div>
                                <div className="rc-input">
                                    <label htmlFor="address">Address</label>
                                    <input type="text" name="address" id="address" />
                                </div>

                                {text == "Teacher" &&

                                    <div className="rc-teacher">
                                        <div className="rc-input">
                                            <label htmlFor="subject">Subject</label>
                                            <input type="text" name="subject" id="subject" />
                                        </div>
                                        <div className="rc-input">
                                            <label htmlFor="experience">Experience</label>
                                            <input type="text" name="experience" id="experience" />
                                        </div>
                                        <div className="rc-qs">
                                            <label htmlFor="qualification">Qualification | Example:(2074BS/Shree Moti High School/English) <span>Add No in empty box</span></label>
                                            <div className="rc-qualification">
                                                <div className="rq-input">
                                                    <label htmlFor="SLC / SEE">SLC / SEE</label>
                                                    <input type="text" name="qual" id="SLC" placeholder='2074BS/Shree Moti High School/English' />
                                                </div>
                                                <div className="rq-input">
                                                    <label htmlFor="HSEB">HSEB</label>
                                                    <input type="text" name="qual" id="HSEB" placeholder='2076BS/Arniko Intl Academy/Management' />
                                                </div>
                                                <div className="rq-input">
                                                    <label htmlFor="Bachelor">Bachelor</label>
                                                    <input type="text" name="qual" id="Bachelor" placeholder='2079BS/Mechi Multiple Campus/BCA' />
                                                </div>
                                                <div className="rq-input">
                                                    <label htmlFor="Master">Master</label>
                                                    <input type="text" name="qual" id="Master" placeholder='2083BS/Mechi Multiple Campus/MCA' />
                                                </div>
                                                <div className="rq-input">
                                                    <label htmlFor="PhD">PhD</label>
                                                    <input type="text" name="qual" id="PhD" />
                                                </div>
                                            </div>
                                        </div>


                                    </div>





                                }



                            </div>
                            <div className="rc-foot">
                                <button className="rc-foot-btn" onClick={() => changeText(userData)}>Reset</button>
                                <button className="rc-foot-btn" onClick={save}>Next</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
}

export default saveData