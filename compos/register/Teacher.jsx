import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSession, signIn, signOut } from "next-auth/react"
import { BsGoogle } from "react-icons/bs"
import { RiFacebookFill } from "react-icons/ri"

function Teacher({ as }) {
    var [google, setGoogle] = useState("#4286F5")
    var [facebook, setFacebook] = useState("#3961ba")
    var [aas, setAas] = useState("a")
    useEffect(() => {
        console.log(as)
        if (as == "Teacher") {
            setAas("a")
        } else {
            setAas("an")
        }
    }, [as])

    function go(provi) {
        signIn(provi, {
            callbackUrl: "/auth/saveData?as=" + as + "&provi=" + provi + "&type=register"
        })
    }
    return (
        <div className='regTeacher'>
            <div className="regTleft">
                {as == "Teacher" ? <h2>More than 920 jobs have been posted in vacantXa by now. Join and Apply for Free </h2> : <h2>More than 920 jobs have been posted in vacantXa by now. Add your Job post here </h2>}

            </div>
            <div className="regTright">
                <div className="rtreg">
                    <div className="rtreg-title">
                        <h2>Register as {aas} {as}</h2>
                    </div>
                    <div className="rtreg-form">
                        <div className="rtreg-form-input">
                            <button onClick={() => go("google")} style={{ backgroundColor: google }}> <BsGoogle />Join using Google </button>
                            <button onClick={() => go("facebook")} style={{ backgroundColor: facebook }}><RiFacebookFill /> Join Using Facebook</button>
                        </div>
                        <div className="rtreg-form-privacy">
                            <p>By joining you agree to our <a href="#">Privacy Policy</a> and <a href="#">Terms of Service</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Teacher