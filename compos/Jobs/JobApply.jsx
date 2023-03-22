import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'

function JobApply({ data }) {
    var router = useRouter()
    var [email, setEmail] = useState("")
    var session = useSession()
    useEffect(() => {
        if (session.status === "unauthenticated") {
            router.push("/login")
        } else if (session.status === "authenticated") {
            setEmail(session.data.user.email)
        }
    }, [session.status])

    function cancel() {
        router.push("/J/" + data._id)
    }

    function apply() {
        var desc = document.getElementById('cover').value
        fetch('/api/job/applyjob', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                postid: data._id,
                email: email,
                desc: desc
            })
        }).then(res => res.json()).then(res => {
            if (res.message == 'Applied') {
                alert('You have succcessfully applied to this job.')
                router.push('/?sort=applied')
            } else if (res.message == 'Already applied') {
                alert('You have already applied to this job.')
                router.push('/?sort=applied')
            }
            console.log(res)
        }
        )
    }


    return (
        <div className='jobCard' id='jobapply'>
            <h2>Apply For This Job?</h2>
            <p>If You think the mentioned job matches your criteria, you can apply for the job instantly.
            </p>
            <div className="ja-cover">
                <h2>Cover Letter</h2>
                <textarea name="cover" id="cover" cols="30" rows="10"></textarea>
            </div>
            <p>Our System will automatically send your Education and Experiences Data to the Client.</p>
            <div className="ja-submit">
                <button onClick={apply}>Submit</button>
                <button onClick={cancel}>Cancel</button>
            </div>
        </div>
    )
}

export default JobApply