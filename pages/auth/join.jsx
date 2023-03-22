import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { signIn } from 'next-auth/react'
import { useSession } from 'next-auth/react'

function join() {
    var { session, status } = useSession()
    useEffect(() => {
        if (status == "authenticated") {
            router.push("/user")
        }
    }, [session])
    var router = useRouter()
    var [textas, setTextas] = useState("Organization")
    useEffect(() => {
        changeCard("asd", 1)
    }, [])
    function changeCard(e, num) {

        var radio = document.querySelectorAll(`.radioselect`)
        // console.log(radio.length)
        for (var i = 0; i < radio.length; i++) {
            radio[i].classList.remove("radioselected")
            if (radio[i].id == `rd${num}`) {
                radio[i].classList.add("radioselected")
            }
        }
        if (num == 1) {
            setTextas("Organization")
        } else[
            setTextas("Teacher")

        ]
    }
    function gotoReg() {
        router.push("./register?as=" + textas)
    }
    return (
        <div className='join'>
            <Head>
                <title>Login to VacantXa</title>
                <link rel="icon" href="/favicon.ico" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="description" content="Join Vacantxa.com to percit your career as a teacher" />
                <meta name="keywords" content="join vacantxa, sign up vacantxa, register vacantxa" />
                <meta name="author" content="Join" />
            </Head>
            <div className="joinCard">
                <h2>Login as a teacher or an Organization</h2>
                <div className="jc-cards">
                    <div className="jc-card" onClick={(e) => changeCard(e, 1)}>
                        <div className="jc_radio">
                            <div className="radioselect" id='rd1'>
                            </div>
                        </div>
                        <div className="jc-desc">
                            I am an organization hiring teachers

                        </div>
                    </div>
                    <div className="jc-card" onClick={(e) => changeCard(e, 2)}>
                        <div className="jc_radio" >
                            <div className="radioselect" id='rd2'>

                            </div>
                        </div>
                        <div className="jc-desc">
                            I am a teacher looking for a job
                        </div>
                    </div>
                </div>
                <div className="jc-btns">
                    <button onClick={gotoReg} className="jc-btn">Join as {textas}</button>
                </div>
            </div>

        </div>
    )
}

export default join