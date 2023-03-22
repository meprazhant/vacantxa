import React from 'react'
import Appliescard from './Appliescard'

function Applied({ data, job }) {
    if (!data) {
        return <div className='Applied'>
            <div className="jc-zero">
                <div className="fourofour">

                </div>
                <h2>Nobody has applied to your job yet </h2>
            </div>


        </div>
    }
    return (
        <div className='Applied'>
            <div className="jc-activity">
                <h2>Applied by: {data?.length} person</h2>
            </div>
            <div className="Ac-cards">
                {data.map((e, index) => {
                    return <Appliescard data={e} key={index} job={job} />
                })}
            </div>

        </div>
    )
}

export default Applied