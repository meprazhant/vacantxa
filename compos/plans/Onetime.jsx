import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Verifying from './Verifying'
import { useRouter } from 'next/router'

function Onetime({ id, frm }) {
    var router = useRouter()
    var [code, setCode] = useState('')
    function fetcc() {
        fetch('/api/job/getjob?id=' + id)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setCode(data.job.code)
            }
            )
    }

    function addAnim() {
        var ul = document.querySelectorAll('#ul li ')
        ul.forEach((li, i) => {
            li.style.animation = `liAnim 1s ease-in-out ${i / 7 + .1}s forwards`
            li.style.opacity = '1'
        }
        )
    }

    var [rs, setRs] = useState(100)

    useEffect(() => {
        frm = frm.toLowerCase()
        if (frm == 'monthly') {
            setRs(1500)
        } else if (frm == 'yearly') {
            setRs(5000)
        } else if (frm == 'onetime') {
            setRs(100)
        }
    }, [frm])

    function doneClick() {
        // fetch("/api/sendmail/send?code=" + code)
        //     .then(res => res.json())
        //     .then(data => {
        //         console.log(data)
        //     }
        //     )

        router.push('/payment/' + frm + '/' + id + '?status=done')
    }

    useEffect(() => {
        fetcc()
        addAnim()
    }, [])
    return (
        <div className='onetime'>
            <Verifying />
            <h2>You are about to purchase {frm} plan for <Link href={'/applicants/' + id}>this</Link> job.</h2>
            <div className="buyStuff">
                <div className="bs-left">
                    <h2>To Buy this plan follow the instruction below</h2>
                    <ul id='ul'>
                        <li>Scan the QR Code below with Esewa/ Khalti or any other Wallet.</li>
                        <li>Enter the amount Rs {rs}.</li>
                        <li>Enter the Message/Remark as <span className="msg">OT-{code}</span></li>
                        <li>Click on Pay.</li>
                        <li>After the payment is done, click on the button below to verify the payment.</li>
                        <li>After the payment is verified, you will be redirected to the job page.</li>
                    </ul>
                    <div className="payBtn">
                        <button onClick={doneClick}>Verify The Payment</button>
                    </div>
                </div>
                <div className="bs-right">
                    <img src="https://i.ibb.co/K6szZd1/image-3.png" alt="QR Screenshot" />
                </div>

            </div>
        </div>
    )
}

export default Onetime