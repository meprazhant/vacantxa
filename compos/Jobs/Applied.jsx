import React, { useEffect, useState } from 'react'
import Appliescard from './Appliescard'
import { useRouter } from 'next/router'

function Applied({ data, job, id }) {
    var router = useRouter()
    var [paid, setPaid] = useState()
    var [loading, setLoading] = useState(true)
    var [applyData, setApplyData] = useState({})

    function getApplies(w) {
        fetch("/api/job/getapplied?id=" + w, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
        }).then(res => res.json()).then(data => {
            setLoading(false)
            if (data.status == 'unpaid') {
                setPaid(false)
            } else {
                setPaid(true)
            }
            setApplyData(data)
        })
    }

    useEffect(() => {
        var id = router.query.id[0]
        getApplies(id)
    }, [router.query.id])

    if (!data) {
        return <div className='Applied'>
            <div className="jc-zero">
                <div className="fourofour">

                </div>
                <h2>Nobody has applied to your job yet </h2>
            </div>


        </div>
    }

    if (loading) {
        return (<div className='Applied'>
            <div className="jc-zero">
                <div className="fourofour">

                </div>
                <h2>Loading...</h2>
            </div>
        </div>
        )
    }

    if (paid) {
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
    } else {
        return (
            <div className='Applied'>
                <div className="jc-zero jc-nomoney">
                    <div className="nomoney">

                    </div>
                    <h2>{applyData.length} person have applied to your Job. Choose a payment plan from Payment Tab in order to view who has applied and hire them</h2>
                    <div className="nm-btns">
                        <button onClick={() => router.push({
                            pathname: '/applicants/' + router.query.id[0],
                            query: {
                                view: 'payment'
                            }
                        })}>Go to Payment</button>
                    </div>
                </div>
            </div>
        )
    }

}

export default Applied