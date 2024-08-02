import React, { createContext, useState, useEffect, useRef, useContext } from 'react';
import { TasksContext } from './TasksContext'; 

export const PomodoroContext = createContext();

export const PomodoroProvider = ({ children }) => {
  const { currentTask, incrementPomodoroCount } = useContext(TasksContext);
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [longBreakLength, setLongBreakLength] = useState(15);
  const [pomodorosBeforeLongBreak, setPomodorosBeforeLongBreak] = useState(4);
  const [timeLeft, setTimeLeft] = useState(sessionLength * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isSession, setIsSession] = useState(true);
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const [breakCount, setBreakCount] = useState(0);
  const [longBreakCount, setLongBreakCount] = useState(0);
  const [pomodoroLog, setPomodoroLog] = useState([]);

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
        const now = new Date();
        setPomodoroLog(prevLog => [...prevLog, { task: currentTask, completedAt: now }]);
        setPomodoroCount(prev => prev + 1);
        if (currentTask) {
          incrementPomodoroCount(currentTask);
        }
        if ((pomodoroCount + 1) % pomodorosBeforeLongBreak === 0) {
          setTimeLeft(longBreakLength * 60);
          setIsSession(false);
          setLongBreakCount(prev => prev + 1);
        } else {
          setTimeLeft(breakLength * 60);
          setIsSession(false);
          setBreakCount(prev => prev + 1);
        }
      } else {
        setTimeLeft(sessionLength * 60);
        setIsSession(true);
      }
    }
  }, [timeLeft, isSession, breakLength, sessionLength, longBreakLength, pomodoroCount, pomodorosBeforeLongBreak, currentTask, incrementPomodoroCount]);

  const resetPomodoro = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setTimeLeft(sessionLength * 60);
    setIsSession(true);
    setPomodoroCount(0);
    setBreakCount(0);
    setLongBreakCount(0);
  };

  const startStopPomodoro = () => {
    setIsRunning(!isRunning);
  };

  const updateSettings = (newSessionLength, newBreakLength, newLongBreakLength, newPomodorosBeforeLongBreak) => {
    setSessionLength(newSessionLength);
    setBreakLength(newBreakLength);
    setLongBreakLength(newLongBreakLength);
    setPomodorosBeforeLongBreak(newPomodorosBeforeLongBreak);
    setTimeLeft(newSessionLength * 60);
  };

  const calculateProgress = () => {
    const totalDuration = isSession
      ? sessionLength * 60
      : (pomodoroCount % pomodorosBeforeLongBreak === 0 ? longBreakLength : breakLength) * 60;
    const progress = ((totalDuration - timeLeft) / totalDuration) * 100;
    return progress;
  };

  const getStatistics = () => {
    const totalPomodoros = pomodoroLog.length;

    const tasks = pomodoroLog.reduce((acc, entry) => {
      acc[entry.task] = (acc[entry.task] || 0) + 1;
      return acc;
    }, {});


    const firstEntryDate = pomodoroLog.length > 0 ? new Date(pomodoroLog[0].completedAt) : new Date();
    const daysElapsed = (new Date() - firstEntryDate) / (1000 * 60 * 60 * 24);

    const averagePomodorosPerDay = daysElapsed > 0 ? totalPomodoros / daysElapsed : 0;

    return {
      totalPomodoros,
      tasks,
      averagePomodorosPerDay,
    };
  };



  return (
    <PomodoroContext.Provider
      value={{
        breakLength,
        sessionLength,
        timeLeft,
        isRunning,
        isSession,
        resetPomodoro,
        startStopPomodoro,
        updateSettings,
        longBreakLength,
        pomodorosBeforeLongBreak,
        pomodoroCount,
        breakCount,
        longBreakCount,
        setPomodoroCount,
        setBreakCount,
        setLongBreakCount,
        setTimeLeft,
        setIsSession,
        calculateProgress,
        pomodoroLog,
        getStatistics
      }}
    >
      {children}
      <audio id="beep" preload="auto" src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav"/>
    </PomodoroContext.Provider>
  );
};

export default PomodoroProvider;
