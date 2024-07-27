import React, { useState, useEffect } from 'react';
import { getTimeRemaining  } from '../utils/time';
import {getNextOccurrence} from '../utils/occurenc';

const CountDownTimer = ({ startDate, endDate, recurrencePattern }) => {
    const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining(startDate, endDate));
    const [currentStartDate, setCurrentStartDate] = useState(new Date(startDate));
    const [currentEndDate, setCurrentEndDate] = useState(new Date(endDate));
  
    useEffect(() => {
      const interval = setInterval(() => {
        const now = new Date();
        const start = new Date(currentStartDate);
        const end = new Date(currentEndDate);
  
        if (now < start) {
          // Countdown has not started yet
          setTimeRemaining(getTimeRemaining(start, end));
        } else if (now > end) {
          // Event has passed, calculate next occurrence
          const nextStart = getNextOccurrence(currentStartDate, recurrencePattern);
          const nextEnd = new Date(nextStart);
          nextEnd.setHours(end.getHours(), end.getMinutes(), end.getSeconds());
  
          setCurrentStartDate(nextStart);
          setCurrentEndDate(nextEnd);
  
          setTimeRemaining(getTimeRemaining(nextStart, nextEnd));
        } else {
          // Countdown is active
          setTimeRemaining(getTimeRemaining(start, end));
        }
      }, 1000);
  
      return () => clearInterval(interval);
    }, [currentStartDate, currentEndDate, recurrencePattern]);
  
    return (
      <div>
        {!timeRemaining.started ? (
          <span>Countdown starts on {new Date(currentStartDate).toLocaleString()}</span>
        ) : timeRemaining.total > 0 ? (
          <span>{timeRemaining.days}d {timeRemaining.hours}h {timeRemaining.minutes}m {timeRemaining.seconds}s</span>
        ) : timeRemaining.nextOccurrence ? (
          <span>Event has passed. Next occurrence: {new Date(currentStartDate).toLocaleString()} to {new Date(currentEndDate).toLocaleString()}</span>
        ) : (
          <span>Event has passed</span>
        )}
      </div>
    );
};
  
export default CountDownTimer;
