import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { MdArrowBack } from 'react-icons/md'
import JobApply from '../../compos/Jobs/JobApply'
import Jobcard from '../../compos/Jobs/Jobcard'

function Jobpage() {
    var router = useRouter()
    var session = useSession()
    var [id, setId] = useState("random")
    var [loaded, setLoaded] = useState(false)
    var [loaded2, setLoaded2] = useState(false)
    var [jobData, setJobdata] = useState({})
    var [accountType, setAccountType] = useState("")
    var [showApply, setShowApply] = useState(false)

    var [isOrgn, setIsOrgn] = useState()


    function getUser() {
        fetch(`/api/user/getUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: session.data?.user.email }),

        })
            .then(res => res.json())
            .then(data => {
                setLoaded2(true)
                if (data?.data) {
                    if (data.data.type == "Teacher") {
                        setIsOrgn(false)
                    } else {
                        setIsOrgn(true)
                    }

                }
            })
            .catch(err => {
                console.log(err)
            }
            )

    }
    useEffect(() => {
        if (!!router.query.id) {
            setId(router.query.id[0])
            getJob(router.query.id[0])
            getUser()
        }
        if (router.query?.action == 'apply') {
            setShowApply(true)
            setTimeout(() => {
                window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: "smooth" });
            }, 100);
        } else {
            setShowApply(false)
        }

    }, [router.query])
    var [authe, setAuthe] = useState(false)




    function getJob(e) {
        fetch(`/api/job/getjob?id=${e}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(res => {
            console.log(res.job)
            setJobdata(res.job)
            setLoaded(true)
        })
    }
    function goback() {
        router.push("/")
    }

    if (!loaded && !loaded2) {
        return null
    }



    return (
        <>
            <Head>
                <title>Job Page | {jobData.desc}</title>

            </Head>
            {(loaded && loaded2) && <div className='jobPage'>
                <div className="jd-dets" >
                    <div onClick={goback} className="jd-back"><MdArrowBack /></div>
                    <h2>Job Detail</h2>
                </div>
                <Jobcard data={jobData} isOrgn={isOrgn} />
                {showApply && <JobApply data={jobData} />}
            </div>}

        </>
    )
}

export default Jobpage