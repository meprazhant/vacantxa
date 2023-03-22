import React from 'react'
import { BsFacebook, BsGoogle, BsLinkedin } from "react-icons/bs"


function Logincard() {
    return (
        <div className='logcard'>
            <div className='logcard_head'>
                <h1>Login to Vacantxa</h1>
            </div>
            <div className='logcard_body'>
                <button className='facebook'>
                    <BsFacebook />
                    <p>Sign in with Facebook</p>
                </button>
                <button className='google'>
                    <BsGoogle />
                    <p>Sign in with Google</p>
                </button>


            </div>
        </div>
    )
}

export default Logincard