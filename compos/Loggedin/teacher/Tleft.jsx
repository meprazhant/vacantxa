import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { BiSearchAlt } from "react-icons/bi"
import { BsFilterCircle, BsFilterCircleFill } from 'react-icons/bs'
import Applied from './Applied'
import Matchjobs from './Matchjobs'
import MostPopular from './MostPopular'
import RecentJobs from './RecentJobs'

import Saved from './Saved'

function Tleft({ user }) {
    var [time, setTime] = useState("")
    var [noon, setNoon] = useState("")
    var router = useRouter()

    function getNoon() {
        var noon = new Date().getHours()
        if (noon < 12) {
            var time = "Morning";
        } else if (noon < 18) {
            var time = "Afternoon";
        } else {
            var time = "Evening";
        }
        setNoon(time)
    }
    function getTime() {
        var time = new Date()
        var day = time.getDay()
        var month = time.getMonth()
        var date = time.getDate()
        var year = time.getFullYear()
        var dayArr = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        var monthArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        var dayName = dayArr[day]
        var monthName = monthArr[month]
        var notation = "th"
        if (date == 1) {
            notation = "st"
        } else if (date == 2) {
            notation = "nd"
        } else if (date == 3) {
            notation = "rd"
        } else if (date == 21) {
            notation = "st"
        } else if (date == 22) {
            notation = "nd"
        } else if (date == 23) {
            notation = "rd"
        } else if (date == 31) {
            notation = "st"
        }
        var fullDate = `${dayName}, ${monthName} ${date}${notation}`
        setTime(fullDate)
    }
    useEffect(() => {
        getNoon()
        getTime()
        router.push('?sort=bestmatches')


    }, [noon, time])

    function changeClass(e) {
        var classify = document.querySelectorAll('.tj-classify p')
        classify.forEach((item) => {
            item.classList.remove('tj-active')
        })
        e.classList.add('tj-active')
        var filter = e.innerText.split(' ').join('').toLowerCase()
        router.push('?sort=' + filter)
    }
    var [sort, setsort] = useState("bestmatches")

    useEffect(() => {
        if (router.query.sort) {
            setsort(router.query.sort)
        }
    }, [router.query.sort])

    function searchJob() {
        var input = document.querySelector('.tl-search input')
        if (input.value == "") {
            alert("Please enter a job title")
        } else {
            router.push({
                pathname: '/',
                query: {
                    sort: sort,
                    search: input.value
                }
            })
        }
    }

    var [navshow, setnavshow] = useState(false)

    function shownav() {
        setnavshow(true)
        var nav = document.querySelectorAll('.tj-classify p')
        // for (var i = 0; i < nav.length; i++) {
        //     setTimeout(() => {
        //         nav[i].classList.toggle('tj-show')
        //     }, 100 * i);
        // }
        console.log(nav)
        nav.forEach((item, i) => {
            setTimeout(() => {
                item.style.display = "block"
                item.classList.remove('tj-hide')
            }, 100 * i);
        }
        )
    }
    function hideNav() {
        setnavshow(false)
        var nav = document.querySelectorAll('.tj-classify p')
        // for (var i = 0; i < nav.length; i++) {
        //     setTimeout(() => {
        //         nav[i].classList.toggle('tj-show')
        //     }, 100 * i);
        // }
        console.log(nav)
        nav.forEach((item, i) => {
            setTimeout(() => {
                item.classList.add('tj-hide')
            }, 100 * i);
        }
        )
    }

    return (
        <div className='tleft'>
            <div className="tl-head">
                <div className="tl-data">
                    <h1>Good {noon}, {user?.name}</h1>
                    <p>{time}</p>
                </div>
                <div className="tl-ills">
                    <div className="tl-ill">
                    </div>
                </div>
            </div>
            <div className="tl-search">
                <input type="text" placeholder="Search for Job" />
                <button onClick={searchJob}><BiSearchAlt /></button>
            </div>
            <div className="tl-jobarea">
                <h1>Jobs you may like </h1>
                <div className="tj-classify">
                    <div className="tjs-filter">
                        <h2>Filter</h2>
                        {(!navshow) && <BsFilterCircle onClick={shownav} />}
                        {(navshow) && <BsFilterCircleFill onClick={hideNav} />}

                    </div>

                    <p onClick={(e) => changeClass(e.target)} className='tj-active'>Best matches</p>
                    <p onClick={(e) => changeClass(e.target)}>Most recent</p>
                    <p onClick={(e) => changeClass(e.target)}>Most popular</p>
                    <p onClick={(e) => changeClass(e.target)}>Saved</p>
                    <p onClick={(e) => changeClass(e.target)}>Applied</p>

                </div>

                {sort == "bestmatches" && <Matchjobs />}
                {sort == "mostrecent" && <RecentJobs />}
                {sort == "mostpopular" && <MostPopular />}
                {sort == "saved" && <Saved />}
                {sort == "applied" && <Applied />}
            </div>

        </div>
    )
}

export default Tleft