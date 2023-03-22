import React, { useEffect, useState } from 'react'

function Appliescard({ data, job }) {
    var [userData, setUserData] = useState({})
    var [loading, setLoading] = useState(true)
    var [fullprofile, setFullprofile] = useState(false)
    var [subject, setSubject] = useState(false)

    function match(e) {
        var neededSub = job.subject
        var usersub = e
        neededSub = neededSub.toLowerCase()
        usersub = usersub.toLowerCase()
        if (usersub == neededSub) {
            setSubject(true)
        } else {
            setSubject(false)
        }
    }
    function getUser() {
        fetch("/api/user/getuserbyid?id=" + data.userid, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: data.email })
        }).then(res => res.json()).then(data => {
            setUserData(data.data)
            mapQuals(data.data.qualification)
            match(data.data.subject)
            setLoading(false)
        })
    }
    var [qual, setQual] = useState([])
    function mapQuals(e) {
        var arr = [
            {
                "Degree": "",
                "Year": "",
                Institute: "",
                "branch": "SLC"
            }
        ]
        var sub = [
            "SLC", "HSEB", "Bachelor", "Master", "PhD"
        ]
        for (var i = 0; i < 5; i++) {
            var a = sub[i]
            arr[i] = {
                "Degree": a,
                "Year": e[a]?.split("/")[0] || "X",
                Institute: e[a]?.split("/")[1] || "X",
                "branch": e[a]?.split("/")[2] || "X"
            }
        }
        setQual(arr)
    }
    useEffect(() => {
        getUser()
    }, [])


    return (
        <div className='ac-card'>
            <div className="ac-wrap">
                <div className="ac-profile">
                    <div className="ac-left">
                        <img src={userData.image} alt={userData.name} referrerPolicy='no-referrer' />
                    </div>
                    <div className="ac-right">
                        <h3>{userData.name}</h3>
                        <p>{userData.email} | {userData?.phone}</p>
                        <p>{userData?.address}</p>
                        <p>Preferred Subject: {userData?.subject}</p>
                    </div>
                </div>
                <div className="ac-btns">
                    {fullprofile ?
                        <button className="ac-btn" onClick={() => setFullprofile(false)}>Hide Full Profile</button>
                        :
                        <button className="ac-btn" onClick={() => setFullprofile(true)}>View Full Profile</button>
                    }

                    <button className="ac-btn">Contact</button>

                </div>
            </div>
            {(subject) &&
                <div className="ac-match mtrue" >
                    This User&apos;s Preferred Subject Matches Your Job required Subject.
                </div>}
            {(!subject) &&
                <div className="ac-match mfalse">
                    This User&apos;s Preferred Subject does not Matches Your Job required Subject. You can still contact this user.
                </div>}

            {fullprofile &&
                <div className="ac-quals">
                    <div className="ac-qc">
                        <h3>Cover Letter</h3>
                        <p>{data.cover}</p>
                    </div>

                    <div className="ac-qc">
                        <h3>Experience</h3>
                        <p>{userData?.experience}</p>
                    </div>
                    <div className="ac-qc" >
                        <h3>Qualifications</h3>
                        <div className='ac-table'>
                            <table border={2}>
                                <tr>
                                    <th>Degree</th>
                                    <th>Year</th>
                                    <th>Institute</th>
                                    <th>Branch</th>
                                </tr>
                                {qual.map((e, i) => {
                                    return (
                                        <tr>
                                            <td>{e.Degree}</td>
                                            <td>{e.Year}</td>
                                            <td>{e.Institute}</td>
                                            <td>{e.branch}</td>
                                        </tr>

                                    )
                                }
                                )}
                            </table>
                        </div>

                    </div>
                </div>
            }
        </div>
    )
}

export default Appliescard