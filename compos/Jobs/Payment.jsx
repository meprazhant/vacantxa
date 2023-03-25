import React from 'react'
import PlanCard from '../plans/PlanCard'

function Payment() {

    return (
        <div className='paymentcard'>
            <div className="pc-header">
                <h2>Flexible Plans and Planning</h2>
                <p>Choose a plan that fits your needs</p>
            </div>
            <div className="pc-plans">
                <PlanCard time='1' />
                <PlanCard time='2' />
                <PlanCard time='3' />
            </div>
        </div>
    )
}

export default Payment