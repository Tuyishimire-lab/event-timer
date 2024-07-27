import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Calendar from './components/Calendar';

function App(){
  return(
    <>
      <NavBar/>
      <Container>
        <Row className='justify-content-md-center'>
          <Col md='auto'>
            <Routes>
              <Route path="/"  element={<Home/>} />
              <Route path="/Calendar" element={<Calendar/>} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default App;