import React, { useState, useEffect } from 'react'
import { ImLocation } from 'react-icons/im'
import { MdVerifiedUser } from 'react-icons/md'
import { CiMoneyBill } from 'react-icons/ci'
import { useRouter } from 'next/router'

function Jobcards(props) {
    var { job } = props
    var router = useRouter()
    var postedOn = new Date(job.postedOn).toDateString()
    var [desc, setDesc] = useState("")
    var [org, setOrg] = useState({})
    function trimDesc(desc) {
        if (desc.length > 100) {

            setDesc(desc.substring(0, 500))
        } else {
            setDesc(desc)
        }
    }
    var [time, setTime] = useState("")

    function navigate() {
        router.push(`/J/${job._id}`)
    }
    function getOrgn() {
        fetch("/api/user/getuserbyid?id=" + job?.orgnData?._id, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(res => {
            console.log(res)
            setOrg(res.data)
        })
    }

    function filterTime() {
        var time = job.postedOn
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
        trimDesc(job.desc)
        filterTime()
        getOrgn()

    }, [])

    return (
        <div className='res_card' onClick={navigate}>
            <div className="res_card_left">
                <div className="res_card_left_head">
                    <img src={org.image} alt="" referrerPolicy='no-referrer' />
                    <h2>{org.name}</h2>
                    <p>
                        <MdVerifiedUser />
                        Verified
                    </p>
                </div>
                <p className='rc_subject'>{job.subject} Teacher ({job.level})</p>
                <div className="res_card_left_desc">
                    {desc} {desc.length > 499 ? <span className='read-more'>... See full description</span> : null}
                </div>
                <div className="res_posted">
                    <p>Posted:  {time}</p>
                </div>
            </div>
            <div className="res_card_right">
                <div className="res_card_right_head">
                    <CiMoneyBill />
                    <p> {job.salary} NPR</p>
                </div>
                <div className="res_card_right_desc">
                    <div className="res_card_right_desc_head">
                        <ImLocation size={20} /><p>{org.address}</p>
                    </div>
                </div>
                <div className="rc_apply">
                    {job.applies?.length > 0 && <>
                        <p>{job.applies?.length} people applied</p>
                    </>}
                </div>
            </div>

        </div>
    )
}

export default Jobcards