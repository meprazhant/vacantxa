import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Subject from '../compos/postajob/Subject'
import Level from '../compos/postajob/Level'
import Salary from '../compos/postajob/Salary'
import Description from '../compos/postajob/Description'
import JobDone from '../compos/postajob/JobDone'

function postjob() {
    var session = useSession()
    var [number, setNumber] = useState(0)
    var [userType, setUserType] = useState("")
    var [next, setNext] = useState([
        "Subject",
        "Level",
        "Salary",
        "Description",
        "Payment",
        "Finalize"
    ])

    var router = useRouter()
    var [userData, setUserData] = useState({})


    function getUser(email) {
        fetch(`/api/user/getUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),

        })
            .then(res => res.json())
            .then(data => {
                setUserData(data.data)
                if (data.data.type == "Teacher") {
                    router.push("/")
                } else {
                    setUserType(data.data.type)
                }
            })
            .catch(err => {
                console.log(err)
            }
            )
    }

    useEffect(() => {
        if (session.status == 'loading') {
            // Loading
        } else if (session.status == 'authenticated') {
            getUser(session.data.user.email)
            // Authenticated
        } else if (session.status == 'unauthenticated') {
            router.push("/auth/join")
        }
    }, [session])


    function changeSlide() {
        console.log(number)
        if (number == 4) {

        } else {
            setNumber(number + 1)
            router.push({
                pathname: '/postjob',
                query: {
                    subject: router.query.subject,
                    level: router.query.level,
                    salary: router.query.salary,
                    description: router.query.description,
                    number: number + 1
                },

            })
        }

    }

    function postData() {
        var datas = {
            subject: router.query.subject,
            level: router.query.level,
            salary: router.query.salary,
            description: router.query.description,
            email: session.data.user.email
        }
        if (!!datas.subject && !!datas.level && !!datas.salary && !!datas.description) {
            fetch(`/api/postjob/postjob`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datas),
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.status == 'true') {
                        alert("Job Posted")
                        router.push("/")
                    } else if (data.status == 'false') {
                        alert("Something went wrong")
                    } else if (data.status == 'unauth') {
                        alert("You are not authorized to do this")
                        router.push("/auth/join")
                    } else if (data.status == 'exist') {
                        alert("You already have a job posted")
                        router.push("/")
                    }
                })
                .catch(err => {
                    console.log(err)
                }
                )
        } else {
            alert("Please fill all the fields")

            if (!datas.subject)
                setNumber(0)
            else if (!datas.level)
                setNumber(1)
            else if (!datas.salary)
                setNumber(2)
            else if (!datas.description)
                setNumber(3)
        }
    }

    function prevSlide() {
        if (number == 0) {
            return
        } else {
            setNumber(number - 1)
        }
    }

    useEffect(() => {
        if (router.query.number) {
            setNumber(parseInt(router.query.number))
        }
    }, [router.query.number])

    return (
        <div>
            <Head>
                <title>Post a Job | Vacantxa</title>
            </Head>
            {userType == "Organization" &&
                <div className="postajob">
                    {number == 0 && <Subject />}
                    {number == 1 && <Level />}
                    {number == 2 && <Salary />}
                    {number == 3 && <Description data={userData} />}
                    {number == 4 && <JobDone />}

                    {/* <Subject /> */}
                    {/* <Level /> */}
                    {/* <Salary /> */}


                    <div className="post-btn">
                        {number == 0 ? null : <button onClick={prevSlide}>Previous :{next[number - 1]}</button>}

                        {number == 4 ? <button onClick={postData}>Post</button> : <button onClick={changeSlide}>Next :{next[number + 1]}</button>}
                    </div>
                </div>
            }
        </div>
    )
}

export default postjob