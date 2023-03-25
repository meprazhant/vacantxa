import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { BsFillPencilFill } from 'react-icons/bs'
import { useSession } from 'next-auth/react'

function Edituser() {
    var router = useRouter()
    var [id, setId] = useState("random")
    var [userData, setUserData] = useState({})
    var session = useSession()
    var [as, setAs] = useState('')

    useEffect(() => {
        if (!!router.query.id) {
            if (router.query?.id[1] == 'edit') {
                console.log('edit')
            } else {
                router.push('/u/' + router.query?.id[0] + '/')
            }
        }
    }, [router.query])

    function getUser(e) {
        fetch(`/api/user/getUser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: e
            })
        }).then(res => res.json()).then(res => {
            console.log(res.data)
            setUserData(res.data)
            fillData(res.data)
            setAs(res.data?.type)
        })
    }

    function fillData(data) {
        var text = document.querySelectorAll(".rc-input input")
        var req = document.querySelectorAll(".rq-input input")
        for (var i = 0; i < text.length; i++) {
            if (!!data[text[i].id])
                text[i].value = data[text[i]?.id]

        }
        if (data?.qualification) {
            for (var i = 0; i < req.length; i++) {
                if (!!data?.qualification[req[i].id])
                    req[i].value = data?.qualification[req[i]?.id]
            }
        }
        console.log(data?.qualification)
    }



    useEffect(() => {
        if (session.status == 'authenticated') {
            getUser(session.data?.user?.email)

        } else if (session.status == 'unauthenticated') {
            router.push('/auth/join')
        }
    }, [session.status])

    useEffect(() => {
        if (userData?.email) {
            if (userData?._id == router.query?.id[0]) {
                fillData(userData)
            } else {
                router.push('/u/' + userData?.email + '/')
            }
        }
    }, [userData])


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
                    alert('User updated successfully')
                    router.push("/")
                }
            })
    }



    return (
        <div>
            <Head>
                <title>Edit User</title>
            </Head>

            <div className='edituser'>
                <div className="eu-card">
                    <div className="rc-body rc-noscroll">
                        <div className="rc-input">
                            <label htmlFor="name">Name:</label>
                            <input type="text" name="name" id="name" />
                        </div>
                        <div className="rc-input">
                            <label htmlFor="email">Email:</label>
                            <input type="text" name="email" readOnly id="email" />
                        </div>
                        <div className="rc-input">
                            <label htmlFor="phone">Phone:</label>
                            <input type="text" name="phone" id="phone" />
                        </div>
                        <div className="rc-input">
                            <label htmlFor="address">Address:</label>
                            <input type="text" name="address" id="address" />
                        </div>
                        {(as == 'Teacher') && <div className="rc-teacher">
                            <div className="rc-input">
                                <label htmlFor="subject">Subject</label>
                                <input type="text" name="subject" id="subject" />
                            </div>
                            <div className="rc-input">
                                <label htmlFor="experience">Experience</label>
                                <input type="text" name="experience" id="experience" />
                            </div>
                            <div className="rc-qs">
                                <label htmlFor="qualification">Qualification | Example:(2074BS/Shree Moti High School/English) </label>
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
                        </div>}

                        <div className="rc-foot rc-asd">
                            <button className="rc-foot-btn" onClick={() => fillData(userData)}>Reset</button>
                            <button className="rc-foot-btn" onClick={save}>Save</button>
                        </div>
                    </div>
                </div>

            </div>


        </div>
    )
}

export default Edituser