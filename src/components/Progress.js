import React, { useContext } from 'react';
import { ProgressBar } from 'react-bootstrap';
import { PomodoroContext } from '../PomodoroContext';

const PomodoroProgress = () => {
  const { calculateProgress, isSession } = useContext(PomodoroContext);
  const progress = calculateProgress();

  return (
    <div>
      <ProgressBar now={progress} label={`${Math.round(progress)}%`} />
      <p>{isSession ? 'Session' : 'Break'} Progress</p>
    </div>
  );
};

export default PomodoroProgress;
