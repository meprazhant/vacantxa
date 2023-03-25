import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Jobcard from '../../compos/Jobs/Jobcard'
import Head from 'next/head'
import Applied from '../../compos/Jobs/Applied'
import Payment from '../../compos/Jobs/Payment'

function Applicants() {
    var session = useSession()
    var router = useRouter()
    var [job, setJob] = React.useState({})
    var [loading, setLoading] = React.useState(true)
    useEffect(() => {
        if (session.status == 'authenticated') {
        } else if (session.status == 'unauthenticated') {
            router.push('/auth/login')
        }
    }, [session.status])

    var [id, setId] = React.useState('')

    useEffect(() => {
        if (!!router.query.id) {
            setId(router.query.id)
            getPost(router.query.id[0])
        }

    }, [router.query.id])

    var [view, setView] = React.useState('Job')

    useEffect(() => {
        if (router.query.view == 'job') {
            setView('Job')
            var apm = document.querySelectorAll('.applicantMenu .applicantMenu__item')
            apm.forEach((e) => {
                e.classList.remove('am-active')
                apm[0].classList.add('am-active')
            }
            )
        } else if (router.query.view == 'applicants') {
            setView('Applicants')
            var apm = document.querySelectorAll('.applicantMenu .applicantMenu__item')
            apm.forEach((e) => {
                e.classList.remove('am-active')
                apm[1].classList.add('am-active')
            }
            )
        }
        else if (router.query.view == 'payment') {
            setView('Payment')
            var apm = document.querySelectorAll('.applicantMenu .applicantMenu__item')
            apm.forEach((e) => {
                e.classList.remove('am-active')
                apm[2].classList.add('am-active')
            }
            )
        }
    }, [router.query.view])


    function getPost(e) {
        console.log(e)
        fetch('/api/job/getjob?id=' + e)
            .then(res => res.json())
            .then(data => {
                setJob(data.job)
                console.log(data.job)
                setLoading(false)
            })
    }

    function navigate(e) {
        setLoading(true)
        var apm = document.querySelectorAll('.applicantMenu .applicantMenu__item')
        apm.forEach((e) => {
            e.classList.remove('am-active')
        }
        )
        e.target.classList.add('am-active')


        if (e.target.innerHTML == 'View Job') {
            router.push({
                pathname: '/applicants/' + id,
                query: { view: 'job' },
            })
        } else if (e.target.innerHTML == 'Applicants') {
            router.push({
                pathname: '/applicants/' + id,
                query: { view: 'applicants' },
            })
        }
        else if (e.target.innerHTML == 'Payment') {
            router.push({
                pathname: '/applicants/' + id,
                query: { view: 'payment' },
            })
        }
    }


    return (
        <div className='jobPage'>
            <Head>
                <title>{view} | {job.desc}</title>
            </Head>

            <div className="applicantMenu">
                <div onClick={(e) => navigate(e)} className="applicantMenu__item am-active"  >
                    View Job
                </div>
                <div onClick={(e) => navigate(e)} className="applicantMenu__item">
                    Applicants
                </div>
                <div onClick={(e) => navigate(e)} className="applicantMenu__item">
                    Payment
                </div>
            </div>

            {loading && <div className="jobLoad">
                <div className="mj-loading-dot"></div>
                <div className="mj-loading-dot"></div>
                <div className="mj-loading-dot"></div>
                <div className="mj-loading-dot"></div>
            </div>
            }

            {(!loading && view == 'Job') && <Jobcard data={job} from={"1"} />}
            {(!loading && view == 'Applicants') && <Applied data={job.applies} job={job} />}
            {(!loading && view == 'Payment') && <Payment data={job.applies} job={job} />}

        </div >
    )
}

export default Applicants