import React, { useState, useContext } from 'react';
import { Container, Row, Col, Button, Form, Modal } from 'react-bootstrap';
import { EventsContext } from '../EventsContext';
import '../App.css';

const Pomodoro = () => {
  const {
    breakLength,
    sessionLength,
    timeLeft,
    isRunning,
    isSession,
    addTask,
    tasks,
    resetPomodoro,
    startStopPomodoro,
    updateSettings,
    longBreakLength,
    pomodorosBeforeLongBreak,
    pomodoroCount,
    breakCount,
    longBreakCount
  } = useContext(EventsContext);

  const [task, setTask] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [newSessionLength, setNewSessionLength] = useState(sessionLength);
  const [newBreakLength, setNewBreakLength] = useState(breakLength);
  const [newLongBreakLength, setNewLongBreakLength] = useState(longBreakLength);
  const [newPomodorosBeforeLongBreak, setNewPomodorosBeforeLongBreak] = useState(pomodorosBeforeLongBreak);

  const handleAddTask = () => {
    if (task) {
      addTask(task);
      setTask('');
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleSaveSettings = () => {
    updateSettings(newSessionLength, newBreakLength, newLongBreakLength, newPomodorosBeforeLongBreak);
    setShowSettings(false);
  };

  return (
    <Container id="pomodoro" className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <div className="text-center">
            <h2 className="mb-4">Pomodoro Timer</h2>
            <div className="d-flex justify-content-between mb-4">
              <div className="pomodoro-stat">
                <span>Pomodoro</span>
                <span>{pomodoroCount}</span>
              </div>
              <div className="pomodoro-stat">
                <span>Rest</span>
                <span>{breakCount}</span>
              </div>
              <div className="pomodoro-stat">
                <span>Long Rest</span>
                <span>{longBreakCount}</span>
              </div>
            </div>
            <div className="pomodoro-timer">
              <h1 className="mb-0">{formatTime(timeLeft)}</h1>
              <p>{isSession ? 'Session' : 'Break'}</p>
            </div>
            <div className="pomodoro-controls mt-3">
              <Button style={{margin: '5px'}} variant="primary" className="me-2" onClick={startStopPomodoro}>
                {isRunning ? 'STOP' : 'START'}
              </Button>
              <Button style={{margin: '5px'}} variant="secondary" onClick={resetPomodoro}>RESET</Button>
              <Button style={{margin: '5px'}} variant="info" onClick={() => setShowSettings(true)}>Settings</Button>
            </div>
            <div className="pomodoro-task mt-4">
              <h4>Tasks</h4>
              <div className="task-input d-flex">
                <Form.Control
                  type="text"
                  placeholder="Add here the task you will focus on"
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                />
                <Button variant="success" onClick={handleAddTask}>+</Button>
              </div>
              <ul className="task-list mt-3">
                {tasks.map((task, index) => (
                  <li key={index}>{task}</li>
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
