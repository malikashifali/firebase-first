import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'

export default function Topbar() {
    const now = new Date()
    const [time, setTime] = useState(dayjs(now).format("ddd DD MMM YYYY hh:mm:ss A"))

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(dayjs().format("ddd DD MMM YYYY hh:mm:ss A"))
        }, 1000)

        // Cleanup the interval on component unmount
        return () => clearInterval(intervalId)
    }, [])

    
    return (
        <div className="container-fluid py-1 bg-secondary text-white">
            <div className="row">
                <div className="col text-center">
                    {time}
                </div>
            </div>
        </div>
    )
}
