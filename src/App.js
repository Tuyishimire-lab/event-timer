import './App.css';
import React, {useRef} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Calendar from './components/Calendar';
import Pomodoro from './components/Pomodoro';
import PomodoroStatistics from './components/Statistics';
import { EventsProvider } from './EventsContext';
import {TasksProvider} from './TasksContext';
import {PomodoroProvider} from './PomodoroContext';

function App(){
  const calendarRef = useRef(null);

  const navigateToEvent = (eventId) =>{
    if(calendarRef.current){
      calendarRef.current.navigateToEvent(eventId);
    }
  }
  return(
    <EventsProvider>
      <TasksProvider>
        <PomodoroProvider>
          <NavBar />
          <Container>
            <Row className='justify-content-md-center'>
              <Col md='auto'>
                <Routes>
                  <Route path="/" element={<Home navigateToEvent={navigateToEvent} />} />
                  <Route path="/Calendar" element={<Calendar ref={calendarRef} />} />
                  <Route path='/Pomodoro' element={<Pomodoro />} />
                  <Route path='Statistics' element={<PomodoroStatistics/>}/>
                </Routes>
              </Col>
            </Row>
          </Container>
        </PomodoroProvider>
      </TasksProvider>
    </EventsProvider>
  )
}

export default App;