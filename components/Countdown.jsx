import { useState,useEffect } from 'react';
import React from 'react'

const Countdown = (props) => {
    const endTime = props.remain;

    const remainTime = endTime - Date.now()
    const [remainingTime, setRemainingTime] = useState("00:00:00");
    
    useEffect(() => {
        if (remainTime <= 0) return;
        const intervalId = setInterval(() => {
            if (remainTime < 1000) {
                console.log(remainTime)
                props.setEnd(true);
                return;
            }
            updateRemainingTime();
        }, 1000);
        return () => clearInterval(intervalId);
    },[remainingTime]); 
    
    
    function updateRemainingTime() {
        const date = new Date(remainTime);
        const remainSec = ("0"+date.getSeconds()).slice(-2);
        const remainMin = ("0"+date.getMinutes()).slice(-2);
        const remainHour = Math.floor(remainTime / 1000 / 60 / 60);
        const countdown = `${remainHour}:${remainMin}:${remainSec}`
        setRemainingTime(countdown);
    }

    return (
        <div style={{marginTop:20}}>
            {remainTime < 1000 ? <div className='endAuction'>경매 종료</div> : <div>남은 시간 {remainingTime}</div>}
            <style jsx>{`
                div{
                    text-align:center;
                    color: #df973a;
                    font-weight: 700;
                }
                .endAuction{
                    color: #999494;
                }

            `}</style>
        </div>
    )
}

export default Countdown