import React, { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { motion } from 'framer-motion'


function Homepage() {
    var [view, setView] = useState("1")

    function changeStuff() {
        if (view == "1") {
            setView("2")
        } else {
            setView("1")
        }
    }


    useEffect(() => {
        var interval = setInterval(() => {
            changeStuff()
        }, 15000)
        return () => {
            clearInterval(interval)
        }
    }, [view])


    return (


        <div className='landing'>
            {view == "1" ?
                <motion.div className="landing-text"
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}>
                    <h2>Find the <i>Qualified</i> Teacher  for your School / College.</h2>
                    <Link href='/register?from=postAds&ref=orgn'>Start Now</Link>
                </motion.div>
                :
                <motion.div className="landing-text"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}>
                    <h2>Find the <i>Best</i> Workspace based on your Skills.</h2>
                    <Link href='/register?from=postAds&ref=teacher'>Apply Now</Link>
                </motion.div>
            }
            {view == "1" ?
                <motion.div className="clipartArea a1"
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}>
                </motion.div>
                :
                <motion.div className="clipartArea a2"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}>
                </motion.div>
            }
        </div >


    )
}

export default Homepage