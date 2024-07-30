import React, { createContext, useState, useEffect, useRef } from 'react';

export const EventsContext = createContext();

export const EventsProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [longBreakLength, setLongBreakLength] = useState(15);
  const [pomodorosBeforeLongBreak, setPomodorosBeforeLongBreak] = useState(4);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isSession, setIsSession] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const [breakCount, setBreakCount] = useState(0);
  const [longBreakCount, setLongBreakCount] = useState(0);
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
        setIsSession(false);
        setPomodoroCount(prev => prev + 1);
      } else {
        setIsSession(true);
        if ((pomodoroCount + 1) % pomodorosBeforeLongBreak === 0) {
          setTimeLeft(longBreakLength * 60);
          setLongBreakCount(prev => prev + 1);
        } else {
          setTimeLeft(sessionLength * 60);
          setBreakCount(prev => prev + 1);
        }
      }
    }
  }, [timeLeft, isSession, breakLength, sessionLength, longBreakLength, pomodoroCount, pomodorosBeforeLongBreak]);

  const resetPomodoro = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setBreakLength(5);
    setSessionLength(25);
    setTimeLeft(25 * 60);
    setIsSession(true);
    setPomodoroCount(0);
    setBreakCount(0);
    setLongBreakCount(0);
    const audio = document.getElementById('beep');
    audio.pause();
    audio.currentTime = 0;
    setTasks([]);
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

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const updateSettings = (newSessionLength, newBreakLength, newLongBreakLength, newPomodorosBeforeLongBreak) => {
    setSessionLength(newSessionLength);
    setBreakLength(newBreakLength);
    setLongBreakLength(newLongBreakLength);
    setPomodorosBeforeLongBreak(newPomodorosBeforeLongBreak);
    setTimeLeft(newSessionLength * 60);
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
        addTask,
        tasks,
        resetPomodoro,
        startStopPomodoro,
        incrementLength,
        decrementLength,
        updateSettings,
        longBreakLength,
        pomodorosBeforeLongBreak,
        pomodoroCount,
        breakCount,
        longBreakCount
      }}
    >
      {children}
      <audio id="beep" preload="auto" src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav"></audio>
    </EventsContext.Provider>
  );
};
