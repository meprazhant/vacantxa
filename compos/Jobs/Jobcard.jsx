import React, { useEffect, useState } from 'react'
import { MdLocationPin } from 'react-icons/md'
import { CiMoneyBill } from 'react-icons/ci'
import { HiOutlineUserGroup } from 'react-icons/hi'
import { FaUserGraduate } from 'react-icons/fa'
import { AiOutlineHeart, AiFillHeart, AiFillCheckCircle } from 'react-icons/ai'
import { IoMdDoneAll } from 'react-icons/io'
import { BiErrorCircle } from 'react-icons/bi'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

function Jobcard({ data, from, isOrgn }) {
    var [view, setView] = useState()
    var session = useSession()
    var router = useRouter()
    var [loadView, setLoad] = useState(false)
    var [user, setUser] = useState({})
    var [saved, setSave] = useState({})
    var [alreadySaved, setAlreadySaved] = useState(false)
    var [org, setOrg] = useState({})
    var [alreadyApplied, setAlreadyApplied] = useState(false)

    function getOrgn() {
        fetch("/api/user/getuserbyid?id=" + data?.orgnData?._id, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(res => {
            console.log(res)
            setOrg(res.data)
        })
    }

    useEffect(() => {
        if (alreadyApplied) {
            router.push({
                pathname: "/J/" + data._id,
                query: { action: "applied" }
            })
        }
    }, [alreadyApplied])

    function getUser(e) {
        fetch("/api/user/getUser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: e
            })
        }).then(res => res.json()).then(res => {
            console.log(res)
            setUser(res.data)
            setSave(res.data.saveJobs)
            if (res.data.saveJobs.includes(data._id)) {
                setAlreadySaved(true)
            }
            for (var i = 0; i < res.data.applies.length; i++) {
                if (res.data.applies[i].postid == data._id) {
                    setAlreadyApplied(true)
                }
            }
        })
    }

    function addView() {
        fetch("/api/job/addview?id=" + data._id, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }

        }).then(res => res.json()).then(res => {
            setView(res.view)
            setLoad(true)
        })
    }
    var [email, setEmail] = useState("")
    var [time, setTime] = useState("")
    function filterTime() {
        var time = data.postedOn
        var date = new Date(time)
        var today = new Date()
        var diff = today - date
        var diffDays = Math.floor(diff / (1000 * 3600 * 24))
        var diffHours = Math.floor(diff / (1000 * 3600))
        var diffMinutes = Math.floor(diff / (1000 * 60))
        var diffSeconds = Math.floor(diff / (1000))
        if (diffDays > 0) {
            setTime(`${diffDays} days ago`)
        } else if (diffHours > 0) {
            setTime(`${diffHours} hours ago`)
        } else if (diffMinutes > 0) {
            setTime(`${diffMinutes} minutes ago`)
        } else if (diffSeconds > 0) {
            setTime(`${diffSeconds} seconds ago`)
        }
    }
    useEffect(() => {
        filterTime()
        addView()
        getOrgn()

    }, [])

    var [saveStatus, setSaveStatus] = useState({})

    useEffect(() => {
        if (saveStatus.status === "saved") {
            setAlreadySaved(true)
        } else if (saveStatus.status === "unsaved") {
            setAlreadySaved(false)
        }
    }, [saveStatus])

    var [saveHehe, setSaveHehe] = useState()
    var [auth, setAuth] = useState(false)



    useEffect(() => {
        if (session.status === "authenticated") {
            setEmail(session.data.user.email)
            getUser(session.data.user.email)
            setAuth(true)
        }
    }, [session.status])

    function saveJob() {
        fetch("/api/job/savejob?id=" + data._id + "&email=" + email + "&action=save", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(res => {
            setSaveStatus(res)
            setAlreadySaved(true)
            setSaveHehe(true)
            setTimeout(() => {
                setSaveHehe(false)
            }, 2000);

        })
    }
    function unsave() {
        fetch("/api/job/savejob?id=" + data._id + "&email=" + email + "&action=unsave", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(res => {
            setSaveStatus(res)
            setAlreadySaved(false)
            setSaveHehe(true)
            setTimeout(() => {
                setSaveHehe(false)
            }, 2000);
        })
    }

    function apply() {

        router.push({
            pathname: '/J/' + data._id,
            query: {

                action: "apply"
            },

        })
    }

    function applied() {
        alert("You have already applied for this job")
    }

    var [time, setTime] = useState("")
    return (
        <div className='jobCard'>
            {(saveHehe && alreadySaved) &&
                <div className="alertCardDone ac-abs">
                    <div className="leftAC">
                        <IoMdDoneAll />
                    </div>
                    <div className="rightAC">
                        <h3>This Job has been saved to your profile</h3>
                    </div>
                </div>
            }
            {(saveHehe && !alreadySaved) &&
                <div className="alertCarderror ac-abs">
                    <div className="leftAC">
                        <BiErrorCircle />
                    </div>
                    <div className="rightAC">
                        <h3>This Job has been removed from your Saved.</h3>
                    </div>
                </div>
            }


            <div className="jc-left">
                <div className="jc-top">
                    <div className="jt-left">
                        <img src={org?.image} alt="" referrerPolicy='no-referrer' />
                        <h3>{org?.name}</h3>
                    </div>
                    {(!from && auth && !isOrgn) && <div className="jt-right">
                        {(alreadyApplied) ? <button className="applied" onClick={applied} style={{ backgroundColor: "blue !important" }} ><IoMdDoneAll fill='white' /> Applied </button> : <button onClick={apply}>Apply Now</button>}
                        {(alreadySaved) ? <button className="saved" onClick={unsave} style={{ backgroundColor: "red !important" }} ><AiFillHeart fill='red' /> Saved </button> : <button onClick={saveJob}><AiOutlineHeart /> Save </button>}
                    </div>}

                    {(!from && !auth) && <div className="jt-right">
                        <button onClick={() => {
                            router.push("/auth/join")
                        }}>Login to Apply</button>
                    </div>}
                    {(!from && auth && isOrgn) && <div className="jt-right">
                        <button style={{ backgroundColor: "red" }}>Cannot apply as Organization account</button>
                    </div>}



                </div>
                <div className="jc-top-data">
                    <div className="jc-loc">
                        <MdLocationPin />
                        <h4>{org?.address}</h4>
                    </div>
                    <div className="jc-posted">
                        <h4>Posted : {time}</h4>
                    </div>
                </div>
                <div className="jc-left-desc">
                    <p>{data.desc}</p>
                </div>
                <div className="jc-details">
                    <div className="jc-details-item">
                        <div className="jf-left">
                            <CiMoneyBill />
                        </div>
                        <div className="jf-right">
                            <p>{data.salary} NPR</p>
                            <p>Salary</p>
                        </div>
                    </div>
                    <div className="jc-details-item">
                        <div className="jf-left">
                            < HiOutlineUserGroup />
                        </div>
                        <div className="jf-right">
                            <p>{data.level} </p>
                            <p>Level</p>
                        </div>
                    </  div>
                    <div className="jc-details-item">
                        <div className="jf-left">
                            < FaUserGraduate />
                        </div>
                        <div className="jf-right">
                            <p>{data.subject} </p>
                            <p>Subject</p>
                        </div>
                    </  div>

                </div>
                <div className="jc-activity">
                    <h2>On This Job</h2>
                    <div className="jc-activity-item">
                        <p>Total Applied: </p>
                        <p>{data.applies?.length || 0}</p>
                    </div>
                    {(loadView) && <div className="jc-activity-item">
                        <p>Total Viewed: </p>
                        <p>{view}</p>
                    </div>}

                </div>
            </div>


        </div >
    )
}

export default Jobcard