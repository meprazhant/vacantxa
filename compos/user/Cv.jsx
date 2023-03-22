import React, { useEffect } from 'react'

function Cv(props) {
    console.log(props)
    props = props.data
    console.log(props.qualification)

    return (
        <div className='cv'>
            <div className="cv-top">
                <div className="cv-img">
                    <img src={props.image} alt="" referrerPolicy='no-referrer' />
                </div>
                <div className="cv-name">
                    <h1>{props.name}</h1>
                    <p>{props.address}</p>
                    <p>{props.phone}</p>
                    <p>{props.email}</p>
                </div>
            </div>
            <div className="cv-education">
                <h1>Education</h1>
                <div className="cv-edu">

                </div>
            </div>


        </div>
    )
}

export default Cv