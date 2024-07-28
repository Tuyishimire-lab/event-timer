import React,{useState, useEffect, useRef} from "react";
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import '../App.css';
const Pomodoro = () =>{
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
  
        const handleReset = () => {
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
  
        const handleStartStop = () => {
          setIsRunning(!isRunning);
        };
  
        const handleIncrement = (type) => {
          if (type === 'break' && breakLength < 60) {
            setBreakLength(breakLength + 1);
          } else if (type === 'session' && sessionLength < 60) {
            setSessionLength(sessionLength + 1);
            if (isSession) {
              setTimeLeft((sessionLength + 1) * 60);
            }
          }
        };
  
        const handleDecrement = (type) => {
          if (type === 'break' && breakLength > 1) {
            setBreakLength(breakLength - 1);
          } else if (type === 'session' && sessionLength > 1) {
            setSessionLength(sessionLength - 1);
            if (isSession) {
              setTimeLeft((sessionLength - 1) * 60);
            }
          }
        };
  
        const formatTime = (time) => {
          const minutes = Math.floor(time / 60);
          const seconds = time % 60;
          return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        };
  
        return (
            <Container id="clock">
            <h1>25 + 5 Clock</h1>
            <Row className="length-controls">
              <Col id="break">
                <h2 id="break-label">Break Length</h2>
                <Button id="break-decrement" onClick={() => handleDecrement('break')}>-</Button>
                <span id="break-length">{breakLength}</span>
                <Button id="break-increment" onClick={() => handleIncrement('break')}>+</Button>
              </Col>
              <Col id="session">
                <h2 id="session-label">Session Length</h2>
                <Button id="session-decrement" onClick={() => handleDecrement('session')}>-</Button>
                <span id="session-length">{sessionLength}</span>
                <Button id="session-increment" onClick={() => handleIncrement('session')}>+</Button>
              </Col>
            </Row>
            <Card className="text-center" id="timer">
              <Card.Body>
                <Card.Title id="timer-label">{isSession ? 'Session' : 'Break'}</Card.Title>
                <Card.Text id="time-left">{formatTime(timeLeft)}</Card.Text>
              </Card.Body>
            </Card>
            <Row className="controls">
              <Button id="start_stop" onClick={handleStartStop}>{isRunning ? 'Stop' : 'Start'}</Button>
              <Button id="reset" onClick={handleReset}>Reset</Button>
            </Row>
            <audio id="beep" preload="auto" src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav"></audio>
          </Container>
        );
};



export default Pomodoro;