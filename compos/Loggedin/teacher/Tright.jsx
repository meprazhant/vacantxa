import React, { useState } from 'react'
import { useRouter } from 'next/router'

function Tright({ user }) {
    var router = useRouter()

    function navigate() {
        router.push('/u/' + user?._id)
    }
    return (
        <div className='Tright'>
            <div className="tr-user">
                <div className="tr-user-img">
                    <img src={user?.image} alt="" referrerPolicy='no-referrer' />
                </div>
                <div className="tr-user-info">
                    <h2 onClick={navigate}>{user?.name}</h2>
                    <p>Email: {user?.email}</p>
                    <p>Phone: {user?.phone}</p>
                    <p>Subject: {user?.subject}</p>
                    <p>Experience: {user?.experience}</p>
                </div>
            </div>
            <div className="tr-user">
                <div className="tr-qual">
                    <h2>Your Qualifications</h2>

                    <div className="trqs">
                        {(user.qualification?.SLC) && <div className="trq">
                            <p>SEE/SLC :</p>
                            <p>{user?.qualification?.SLC}</p>
                        </div>}
                        {(user.qualification?.HSEB) && <div className="trq">
                            <p>+2/HSEB:</p>
                            <p>{user?.qualification?.HSEB}</p>
                        </div>}
                        {(user.qualification?.Bachelor) && <div className="trq">
                            <p>Bachelor:</p>
                            <p>{user?.qualification?.Bachelor}</p>
                        </div>}
                        {(user.qualification?.Master) && <div className="trq">
                            <p>Master:</p>
                            <p>{user?.qualification?.Master}</p>
                        </div>}
                        {(user.qualification?.PhD) && <div className="trq">
                            <p>PhD:</p>
                            <p>{user?.qualification?.PhD}</p>
                        </div>}
                    </div>

                </div>


            </div >
        </div >
    )
}

export default Tright