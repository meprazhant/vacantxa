import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

function Verifying() {
    var [show, setShow] = useState(false)
    var router = useRouter()

    useEffect(() => {
        if (router.query.status == 'done') {
            setShow(true)
        } else {
            setShow(false)
        }

    }, [router.query.status])
    function back() {
        router.push('/')
    }

    function removeParam(key, sourceURL) {
        var rtn = sourceURL.split("?")[0],
            param,
            params_arr = [],
            queryString = (sourceURL.indexOf("?") !== -1) ? sourceURL.split("?")[1] : "";
        if (queryString !== "") {
            params_arr = queryString.split("&");
            for (var i = params_arr.length - 1; i >= 0; i -= 1) {
                param = params_arr[i].split("=")[0];
                if (param === key) {
                    params_arr.splice(i, 1);
                }
            }
            if (params_arr.length) rtn = rtn + "?" + params_arr.join("&");
        }
        return rtn;
    }

    function close() {

        router.push(removeParam('status', router.asPath))

    }

    if (show) {
        return (
            <div className='verifyie'>
                <div className="vericard">
                    <div className="crosx" onClick={close}>
                        x
                    </div>
                    <h2>Verifying Payment</h2>
                    <p>Please wait while we verify your payment. This may take a while. We will mail you when we accept your payment. </p>
                    <button onClick={back}>Back to Home</button>

                </div>
            </div>
        )
    }

}

export default Verifying