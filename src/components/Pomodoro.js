import React,{useContext} from "react";
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { EventsContext } from "../EventsContext";
import '../App.css';


const Pomodoro = () =>{
  const {
    breakLength,
    sessionLength,
    timeLeft,
    isRunning,
    isSession,
    resetPomodoro,
    startStopPomodoro,
    incrementLength,
    decrementLength
  } = useContext(EventsContext);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return(
    <Container id="clock">
      <h1>25 + 5 Clock</h1>
      <Row className="length-controls">
        <Col id="break">
          <h2 id="break-label">Break Length</h2>
          <Button id="break-decrement" onClick={() => decrementLength('break')}>-</Button>
          <span id="break-length">{breakLength}</span>
          <Button id="break-increment" onClick={() => incrementLength('break')}>+</Button>
        </Col>
        <Col id="session">
          <h2 id="session-label">Session Length</h2>
          <Button id="session-decrement" onClick={() => decrementLength('session')}>-</Button>
          <span id="session-length">{sessionLength}</span>
          <Button id="session-increment" onClick={() => incrementLength('session')}>+</Button>
        </Col>
      </Row>
      <Card className="text-center" id="timer">
        <Card.Body>
          <Card.Title id="timer-label">{isSession ? 'Session' : 'Break'}</Card.Title>
          <Card.Text id="time-left">{formatTime(timeLeft)}</Card.Text>
        </Card.Body>
      </Card>
      <Row className="controls">
        <Button id="start_stop" onClick={startStopPomodoro}>{isRunning ? 'Stop' : 'Start'}</Button>
        <Button id="reset" onClick={resetPomodoro}>Reset</Button>
      </Row>
    </Container>
  );
};



export default Pomodoro;