import React, {useState, useEffect} from 'react';
import { getTimeRemaining } from '../utils/time';

const CountDownTimer = ({endDate})=>{
    const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining(endDate));


    useEffect(() =>{
        const interval = setInterval(()=>{
            setTimeRemaining(getTimeRemaining(endDate));
        }, 1000);
        return ()=> clearInterval(interval);
    }, [endDate])

    return(
        <div>
            {timeRemaining.total > 0 ? (
                <span>{timeRemaining.days}d {timeRemaining.hours}h {timeRemaining.minutes}m{timeRemaining.seconds}s</span>
            ): (
                <spa>Event has passed</spa>
            )}
        </div>
    )

}

export default CountDownTimer;