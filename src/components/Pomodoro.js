import React, { useState, useContext } from 'react';
import { Container, Row, Col, Button, Form, Modal } from 'react-bootstrap';
import { TasksContext } from '../TasksContext';
import { PomodoroContext } from '../PomodoroContext';

import '../App.css';

const Pomodoro = () => {
  // Task Context
  const {
    tasks,
    completedTasks,
    currentTask,
    taskPomodoros,
    addTask,
    completeTask,
    setCurrentTaskForPomodoro
  } = useContext(TasksContext);
  
  // Pomodoro Context
  const {
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
  } = useContext(PomodoroContext);

  // State for adding new tasks and managing settings
  const [task, setTask] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [showSettings, setShowSettings] = useState(false);
  const [newSessionLength, setNewSessionLength] = useState(sessionLength);
  const [newBreakLength, setNewBreakLength] = useState(breakLength);
  const [newLongBreakLength, setNewLongBreakLength] = useState(longBreakLength);
  const [newPomodorosBeforeLongBreak, setNewPomodorosBeforeLongBreak] = useState(pomodorosBeforeLongBreak);

  // Add a new task
  const handleAddTask = () => {
    if (task) {
      addTask(task, priority);
      setTask('');
      setPriority('Medium');
    }
  };

  // Select a task to work on
  const handleSelectTask = (task) => {
    setCurrentTaskForPomodoro(task);
  };

  // Mark a task as completed
  const handleCompleteTask = (task) => {
    completeTask(task);
  };

  // Format time for display
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Save changes to settings
  const handleSaveSettings = () => {
    updateSettings(newSessionLength, newBreakLength, newLongBreakLength, newPomodorosBeforeLongBreak);
    setShowSettings(false);
  };

  // Sort tasks based on priority
  const sortedTasks = tasks.sort((a, b) => {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  return (
    <Container id="pomodoro" className="mt-5">
      <Row className="justify-content-center">
        <Col md={12} lg={12} >
          <div className="text-center">
            <h2 className=" h2-cla mb-4">Pomodoro Timer</h2>
            <div className="d-flex justify-content-between mb-4">
              <div className="pomodoro-stat">
                <span>Pomodoros</span>
                <span>{pomodoroCount}</span>
              </div>
              <div className="pomodoro-stat">
                <span>Breaks</span>
                <span>{breakCount}</span>
              </div>
              <div className="pomodoro-stat">
                <span>Long Breaks</span>
                <span>{longBreakCount}</span>
              </div>
            </div>
            <div className="pomodoro-timer">
              <h1 className="mb-0">{formatTime(timeLeft)}</h1>
              <p>{isSession ? 'Session' : (pomodoroCount % pomodorosBeforeLongBreak === 0 ? 'Long Break' : 'Break')}</p>
            </div>
            <div className="pomodoro-controls mt-3">
              <Button style={{margin: '5px'}} variant="primary" className="me-2" onClick={startStopPomodoro}>
                {isRunning ? 'STOP' : 'START'}
              </Button>
              <Button style={{margin: '5px'}} variant="danger" onClick={resetPomodoro}>RESET</Button>
              <Button style={{margin: '5px'}} variant="info" onClick={() => setShowSettings(true)}>SETTINGS</Button>
            </div>
            <Form className="mt-4">
              <Form.Group controlId="taskInput">
                <Form.Label>Add Task</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter task"
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                />
                <Form.Select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="mt-2"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </Form.Select>
              </Form.Group>
              <Button style={{margin: '5px'}} variant="primary" onClick={handleAddTask}>Add Task</Button>
            </Form>
            <div className="mt-4">
              <h4>Tasks</h4>
              <ul className="list-group">
                {sortedTasks.map((task, index) => (
                  <li
                    key={index}
                    className={`list-group-item ${task.completed ? 'list-group-item-success' : ''} ${currentTask === task.task ? 'active' : ''}`}
                  >
                    <span onClick={() => handleSelectTask(task.task)}>{task.task} - {taskPomodoros[task.task] || 0} Pomodoros</span>
                    {!task.completed && (
                      <Button
                        variant="success"
                        size="sm"
                        className="float-end"
                        onClick={() => handleCompleteTask(task.task)}
                      >
                        Complete
                      </Button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{marginBottom:'10px'}} className="mt-4">
              <h4>Completed Tasks</h4>
              <ul className="list-group">
                {completedTasks.map((task, index) => (
                  <li key={index} className="list-group-item list-group-item-success">
                    {task}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Col>
      </Row>

      <Modal show={showSettings} onHide={() => setShowSettings(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Pomodoro Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="sessionLength">
              <Form.Label>Session Length (minutes)</Form.Label>
              <Form.Control
                type="number"
                value={newSessionLength}
                onChange={(e) => setNewSessionLength(e.target.value)}
                min="1"
                max="60"
              />
            </Form.Group>
            <Form.Group controlId="breakLength">
              <Form.Label>Break Length (minutes)</Form.Label>
              <Form.Control
                type="number"
                value={newBreakLength}
                onChange={(e) => setNewBreakLength(e.target.value)}
                min="1"
                max="60"
              />
            </Form.Group>
            <Form.Group controlId="longBreakLength">
              <Form.Label>Long Break Length (minutes)</Form.Label>
              <Form.Control
                type="number"
                value={newLongBreakLength}
                onChange={(e) => setNewLongBreakLength(e.target.value)}
                min="1"
                max="60"
              />
            </Form.Group>
            <Form.Group controlId="pomodorosBeforeLongBreak">
              <Form.Label>Pomodoros Before Long Break</Form.Label>
              <Form.Control
                type="number"
                value={newPomodorosBeforeLongBreak}
                onChange={(e) => setNewPomodorosBeforeLongBreak(e.target.value)}
                min="1"
                max="10"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSettings(false)}>Close</Button>
          <Button variant="primary" onClick={handleSaveSettings}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Pomodoro;
