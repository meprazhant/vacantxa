import React, { useEffect, useState } from 'react'
import Tleft from './Tleft'
import Tright from './Tright'

function Dashboard({ user }) {
    var [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!!user) {
            setLoading(false)
        }
    }, [])
    return (
        <div className='tDash'>
            <Tleft user={user} />
            {loading ? <div className="mj-loading">
                <div className="mj-loading-dot"></div>
                <div className="mj-loading-dot"></div>
                <div className="mj-loading-dot"></div>
            </div> :
                <Tright user={user} />
            }
        </div>
    )
}

export default Dashboard