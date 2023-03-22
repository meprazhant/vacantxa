import React from 'react'
import { ImLocation } from 'react-icons/im'
import { MdVerifiedUser } from 'react-icons/md'

function Recentcards(props) {
    var { title, desc, salary, school, location, posted } = props
    return (
        <div className='res_card'>
            <div className="res-apply">
                <button>Apply Now</button>
            </div>
            <div className="res_card_left">
                <div className="res_card_left_head">
                    <h2>{school}</h2>
                    <p>
                        <MdVerifiedUser />
                        Verified
                    </p>
                </div>
                <p>{title}</p>
                <div className="res_card_left_desc">
                    {desc}
                </div>
                <div className="res_posted">
                    <p>Posted:  {posted}</p>
                </div>
            </div>
            <div className="res_card_right">
                <div className="res_card_right_head">
                    <p>{salary}</p>
                </div>
                <div className="res_card_right_desc">
                    <div className="res_card_right_desc_head">
                        <ImLocation size={20} /><p>{location}</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Recentcards