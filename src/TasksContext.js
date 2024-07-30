import React, { createContext, useState } from 'react';

export const TasksContext = createContext();

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const [taskPomodoros, setTaskPomodoros] = useState({});

  const addTask = (task, priority) => {
    setTasks((prevTasks) => [...prevTasks, { task, priority, completed: false }]);
  };

  const completeTask = (task) => {
    setTasks((prevTasks) =>
      prevTasks.map(t => (t.task === task ? { ...t, completed: true } : t))
    );
    setCompletedTasks((prevCompletedTasks) => [...prevCompletedTasks, task]);
  };

  const setCurrentTaskForPomodoro = (task) => {
    setCurrentTask(task);
    if (!taskPomodoros[task]) {
      setTaskPomodoros(prev => ({ ...prev, [task]: 0 }));
    }
  };

  const incrementPomodoroCount = (task) => {
    setTaskPomodoros(prev => ({
      ...prev,
      [task]: (prev[task] || 0) + 1
    }));
  };

  return (
    <TasksContext.Provider
      value={{
        tasks,
        completedTasks,
        currentTask,
        taskPomodoros,
        addTask,
        completeTask,
        setCurrentTaskForPomodoro,
        incrementPomodoroCount
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export default TasksProvider;
