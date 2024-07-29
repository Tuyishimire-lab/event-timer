import React, { useState, useEffect } from 'react';
import { getTimeRemaining } from '../utils/time';
import { getNextOccurrence } from '../utils/occurenc';

const CountDownTimer = ({ startDate, endDate, isRecurring, recurrencePattern }) => {
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
        setTimeRemaining({ ...getTimeRemaining(start, end), started: false });
      } else if (now > end) {
        // Event has passed
        if (isRecurring) {
          // Calculate next occurrence for recurring events
          const nextStart = getNextOccurrence(currentStartDate, recurrencePattern);
          if (nextStart) {
            const nextEnd = new Date(nextStart);
            nextEnd.setHours(end.getHours(), end.getMinutes(), end.getSeconds());

            setCurrentStartDate(nextStart);
            setCurrentEndDate(nextEnd);

            setTimeRemaining({ ...getTimeRemaining(nextStart, nextEnd), started: true });
          } else {
            // No next occurrence
            setTimeRemaining({ total: 0, started: true });
          }
        } else {
          // Non-recurring event has passed
          setTimeRemaining({ total: 0, started: true });
        }
      } else {
        // Countdown is active
        setTimeRemaining({ ...getTimeRemaining(start, end), started: true });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [currentStartDate, currentEndDate, isRecurring, recurrencePattern]);

  return (
    <div>
      {!timeRemaining.started ? (
        <span>Countdown starts on {new Date(currentStartDate).toLocaleString()}</span>
      ) : timeRemaining.total > 0 ? (
        <span>{timeRemaining.days}d {timeRemaining.hours}h {timeRemaining.minutes}m {timeRemaining.seconds}s</span>
      ) : (
        <span>Event has passed</span>
      )}
    </div>
  );
};

export default CountDownTimer;
