import React, { createContext, useState, useEffect, useRef } from 'react';

export const EventsContext = createContext();

export const EventsProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isSession, setIsSession] = useState(true);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  useEffect(() => {
    if (timeLeft === 0) {
      const audio = document.getElementById('beep');
      audio.play();
      if (isSession) {
        setTimeLeft(breakLength * 60);
      } else {
        setTimeLeft(sessionLength * 60);
      }
      setIsSession(!isSession);
    }
  }, [timeLeft, isSession, breakLength, sessionLength]);

  const resetPomodoro = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setBreakLength(5);
    setSessionLength(25);
    setTimeLeft(25 * 60);
    setIsSession(true);
    const audio = document.getElementById('beep');
    audio.pause();
    audio.currentTime = 0;
  };

  const startStopPomodoro = () => {
    setIsRunning(!isRunning);
  };

  const incrementLength = (type) => {
    if (type === 'break' && breakLength < 60) {
      setBreakLength(breakLength + 1);
    } else if (type === 'session' && sessionLength < 60) {
      setSessionLength(sessionLength + 1);
      if (isSession) {
        setTimeLeft((sessionLength + 1) * 60);
      }
    }
  };

  const decrementLength = (type) => {
    if (type === 'break' && breakLength > 1) {
      setBreakLength(breakLength - 1);
    } else if (type === 'session' && sessionLength > 1) {
      setSessionLength(sessionLength - 1);
      if (isSession) {
        setTimeLeft((sessionLength - 1) * 60);
      }
    }
  };

  return (
    <EventsContext.Provider
      value={{
        events,
        setEvents,
        breakLength,
        sessionLength,
        timeLeft,
        isRunning,
        isSession,
        resetPomodoro,
        startStopPomodoro,
        incrementLength,
        decrementLength
      }}
    >
      {children}
      <audio id="beep" preload="auto" src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav"></audio>
    </EventsContext.Provider>
  );
};
