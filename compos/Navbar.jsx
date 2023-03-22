
import React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { BsSun, BsMoon } from "react-icons/bs"
import { AiOutlineUserAdd } from "react-icons/ai"
import Selectlogin from "./login/Selectlogin"
import { useSession } from "next-auth/react"

export default function Navbar() {
    const { theme, setTheme } = useTheme()
    const session = useSession()
    const [auth, setAuth] = useState(false)
    const [loading, setLoading] = useState(true)
    var [type, setType] = useState("Teacher")
    var [data, setData] = useState({})
    function changeTheme() {
        if (theme == "light") {
            setTheme("dark")
        } else {
            setTheme("light")
        }
    }
    var sessx = useSession()
    useEffect(() => {
        if (sessx.status === 'authenticated') {
            getUser(sessx.data.user.email)
        }
    }, [sessx])

    function getUser(email) {
        fetch('/api/user/getUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email
            })
        }).then(res => res.json())
            .then(data => {
                setData(data.data)
                setType(data.data?.type)
            })
    }

    useEffect(() => {
        if (session.status == 'loading') {
        } else if (session.status == 'authenticated') {
            setAuth(true)
            setLoading(false)

        } else if (session.status == 'unauthenticated') {
            setAuth(false)
            setLoading(false)
        }
        else
            setAuth(false)
    }, [session])
    function poplogin() {
        var poplog = document.getElementById('poplogin')
        if (poplog.style.display == "flex") {
            poplog.style.display = "none"
        } else
            poplog.style.display = "flex"

    }
    return (
        <div className="navbar prose md:prose-xl dark:prose-dark dark:md:prose-xl-dark ">
            <div className="popLogin" id="poplogin">
                <Selectlogin />
                <div className="login_exit">
                    <button onClick={poplogin}>
                        X
                    </button>
                </div>
            </div>
            <div className="nav_logo">
                <Link href="/">
                    <img src="https://i.ibb.co/ZxWgznR/vacantxa.png" alt="logo" />
                </Link>
                <div className="nav_links">
                    <Link href="/explore">
                        Explore Jobs
                    </Link>
                    <Link href="/learn">
                        Learn more
                    </Link>
                    <Link href="/about">
                        Who are we?
                    </Link>
                </div>
            </div>
            <div className="account_area">

                <a className="changeTheme" onClick={changeTheme}>
                    {theme == "light" ? <BsMoon /> : <BsSun />}
                </a>
                {(auth && type == "Organization") &&
                    <Link href={"/postjob"}>
                        <button className="postjob">
                            Post a Job
                        </button>
                    </Link>
                }
                {(!loading && auth) &&
                    <Link className="aa-link" href={"/u/" + data?._id}>
                        <img src={session.data.user.image} alt="profile" referrerPolicy="no-referrer" />
                    </Link>


                }
                {(!loading && !auth) &&
                    <>
                        <Link href="/auth/join">
                            <AiOutlineUserAdd className="icon" />
                            Login
                        </Link>
                    </>
                }

            </div>
        </div>
    )
}
