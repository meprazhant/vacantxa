import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { BsCheckCircle, BsCheckCircleFill } from 'react-icons/bs'

function PlanCard({ time, nodir, id }) {
    time = time - 1
    var data = [
        {
            header: 'One Time',
            desc: 'For One Time Use',
            money: 'NPR. 100',
            mondes: 'Per Job Posted',
            desc1: 'Track Who has applied to your job',
            desc2: 'Whitelist them and get their CV and Contact Details',
            desc3: 'Professional Dashboard',
            desc4: 'Add "Verified" tick at the Job and Profile'
        },
        {
            header: 'Monthly',
            desc: 'Applicable for a month',
            money: 'NPR. 1500',
            mondes: 'per month all Jobs',
            all: true,
            desc1: 'Track Who has applied to your job',
            desc2: 'Whitelist them and get their CV and Contact Details',
            desc3: 'Professional Dashboard',
            desc4: 'Add "Verified" tick at the Job and Profile'
        },
        {
            header: 'Yearly',
            desc: 'Applicable for an year',
            money: 'NPR. 5000',
            all: true,
            mondes: 'per year all Jobs',
            desc1: 'Track Who has applied to your job',
            desc2: 'Whitelist them and get their CV and Contact Details',
            desc3: 'Professional Dashboard',
            desc4: 'Add "Verified" tick at the Job and Profile'

        }
    ]
    var [jobData, setJobData] = useState({})
    useEffect(() => {
        console.log(data[time])
        setJobData(data[time])
    }, [time])

    var router = useRouter()

    function gotoplan() {
        if (!nodir) {
            if (jobData?.header == 'One Time') {
                router.push('/payment/onetime/' + router.query.id[0])
            } else if (jobData?.header == 'Monthly') {
                router.push('/payment/monthly/' + router.query.id[0])
            } else if (jobData?.header == 'Yearly') {
                router.push('/payment/yearly/' + router.query.id[0])
            }
        } else {
            if (jobData?.header == 'One Time') {
                router.push('/payment/onetime/' + id)
            } else if (jobData?.header == 'Monthly') {
                router.push('/payment/monthly/' + id)
            } else if (jobData?.header == 'Yearly') {
                router.push('/payment/yearly/' + id)
            }

        }
    }

    return (
        <div className='planCard' onClick={gotoplan}>
            <div className="pcard-header">
                <h2>{jobData?.header}</h2>
                <p>{jobData?.desc}</p>
            </div>
            <div className="pc-body">
                <div className="pc-money">
                    <h2>{jobData?.money}</h2>
                    <p>{jobData?.mondes}</p>
                </div>
                <div className="pc-desc">
                    <div className="pdes-card">
                        <BsCheckCircleFill color='green' />
                        <p>{jobData?.desc1}</p>
                    </div>
                    <div className="pdes-card">
                        <BsCheckCircleFill color='green' />
                        <p>{jobData?.desc2}</p>
                    </div>
                    {(!jobData?.all) ? <div className="pdes-card pdes-inactive">
                        <BsCheckCircle />
                        <p>{jobData?.desc3}</p>
                    </div>
                        :
                        <div className="pdes-card">
                            <BsCheckCircleFill color='green' />
                            <p>{jobData?.desc3}</p>
                        </div>
                    }
                    {(!jobData?.all) ? <div className="pdes-card pdes-inactive" >
                        <BsCheckCircle />
                        <p>{jobData?.desc4} </p>
                    </div> :
                        <div className="pdes-card " >
                            <BsCheckCircleFill color='green' />
                            <p>{jobData.desc4} </p>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default PlanCard