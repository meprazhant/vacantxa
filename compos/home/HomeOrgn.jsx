import React, { useEffect, useState } from 'react'
import { MdWorkOutline, MdOutlineContactSupport } from 'react-icons/md'
import { ImManWoman } from 'react-icons/im'

function HomeOrgn() {
    useEffect(() => {
        getWidth()
        window.addEventListener('resize', getWidth)
        return () => {
            window.removeEventListener('resize', getWidth)
        }
    })
    var [docx, setdocw] = useState("200px")
    var [jcc, setjcc] = useState("start")

    function getWidth() {
        var cw = window.innerWidth
            || document.documentElement.clientWidth
            || document.body.clientWidth;

        var leftW = (4 / 100) * cw
        var newcw = cw - leftW
        var docw = newcw / 4

        var fortwo = (newcw / 2) - 50

        if (docw < 250) {
            setdocw(250);
        } else {
            setdocw(docw - 50)
        }
        if (docw - 50 < 188) {
            setjcc("center")
            setdocw(fortwo)
        } else {
            setjcc("start")
        }
    }

    return (
        <div className='Horgn'>
            <div className="horgn-title">
                Need a teacher?
            </div>

            <div className="horgn-cards" style={{ justifyContent: jcc }}>
                <div className="horgn-card" style={{ width: docx }}>
                    <div className="hcard-head">
                        <MdWorkOutline size={35} />
                        Post
                    </div>
                    <div className="hcard-desc">
                        It&apos;s free and easy to post a job. Simply fill in a the Job's Data, Salary and Teacher&apos;s CV will come within minutes.
                    </div>
                </div>
                <div className="horgn-card" style={{ width: docx }}>
                    <div className="hcard-head">
                        <ImManWoman size={35} />
                        Fast Connect
                    </div>
                    <div className="hcard-desc">
                        Connect with tons of qualified teachers in minutes. You can also filter your search by location, experience, and more.
                    </div>
                </div>
                <div className="horgn-card" style={{ width: docx }}>
                    <div className="hcard-head">
                        <MdOutlineContactSupport size={35} />
                        Post
                    </div>
                    <div className="hcard-desc">
                        It&apos;s free and easy to post a job. Simply fill in a the Job's Data, Salary and Teacher&apos;s CV will come within minutes.
                    </div>
                </div>
                <div className="horgn-card" style={{ width: docx }}>
                    <div className="hcard-head">
                        <MdOutlineContactSupport size={35} />
                        Support
                    </div>
                    <div className="hcard-desc">
                        We, the team of vacantxa, are always here to help you. If you have any questions, please contact us, and our team will be happy to help you.
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeOrgn