import './App.css';
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Calendar from './components/Calendar';
import Pomodoro from './components/Pomodoro';
import { EventsProvider } from './EventsContext';

function App(){
  return(
    <EventsProvider>
      <NavBar/>
      <Container>
        <Row className='justify-content-md-center'>
          <Col md='auto'>
            <Routes>
              <Route path="/"  element={<Home/>} />
              <Route path="/Calendar" element={<Calendar/>} />
              <Route path='/Pomodoro' element={<Pomodoro/>}/>
            </Routes>
          </Col>
        </Row>
      </Container>
    </EventsProvider>
  )
}

export default App;