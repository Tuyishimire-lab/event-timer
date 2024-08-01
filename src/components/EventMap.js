import React, { useContext } from 'react';
import { Container, Row, Col, Dropdown, Badge } from 'react-bootstrap';
import { FaCheckCircle, FaHourglassHalf, FaPlayCircle, FaClock } from 'react-icons/fa';
import { EventsContext } from '../EventsContext';
import { PomodoroContext } from '../PomodoroContext';
import PomodoroProgress from './Progress';

const EventMap = ({ navigateToMap }) => {
  const { events } = useContext(EventsContext);
  const { isRunning, isSession, sessionLength, breakLength } = useContext(PomodoroContext);

  const now = new Date();

  const categorizedEvents = events.reduce(
    (acc, event) => {
      const start = new Date(event.startDate);
      const end = new Date(event.endDate);

      if (end < now) {
        acc.passed.push(event);
      } else if (start > now) {
        acc.pending.push(event);
      } else {
        acc.running.push(event);
      }

      return acc;
    },
    { passed: [], pending: [], running: [] }
  );

  return (
    <Container className='map'>
      <Row className="map-content">
        <Col  md={3} className="mb-2 d-flex justify-content-center">
          <div style={{ textAlign: 'center', padding: '10px', border: '1px solid green', borderRadius: '5px', width: '100%' }}>
            <FaPlayCircle style={{ color: 'green', fontSize: '1.5em' }} />
            <h6>Running</h6>
            <Badge pill bg="success">{categorizedEvents.running.length}</Badge>
            <Dropdown>
              <Dropdown.Toggle variant="link" size="sm" id="dropdown-running">
                View
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {categorizedEvents.running.length > 0 ? (
                  categorizedEvents.running.map(event => (
                    <Dropdown.Item key={event.id} onClick={() => navigateToMap(event.id)}>
                      {event.title}
                    </Dropdown.Item>
                  ))
                ) : (
                  <Dropdown.Item>No running events.</Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Col>
        <Col xs={12} md={3} className="mb-2 d-flex justify-content-center">
          <div style={{ textAlign: 'center', padding: '10px', border: '1px solid orange', borderRadius: '5px', width: '100%' }}>
            <FaHourglassHalf style={{ color: 'orange', fontSize: '1.5em' }} />
            <h6>Pending</h6>
            <Badge pill bg="warning">{categorizedEvents.pending.length}</Badge>
            <Dropdown>
              <Dropdown.Toggle variant="link" size="sm" id="dropdown-pending">
                View
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {categorizedEvents.pending.length > 0 ? (
                  categorizedEvents.pending.map(event => (
                    <Dropdown.Item key={event.id} onClick={() => navigateToMap(event.id)}>
                      {event.title}
                    </Dropdown.Item>
                  ))
                ) : (
                  <Dropdown.Item>No pending events.</Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Col>
        <Col xs={12} md={3} className="mb-2 d-flex justify-content-center">
          <div style={{ textAlign: 'center', padding: '10px', border: '1px solid red', borderRadius: '5px', width: '100%' }}>
            <FaCheckCircle style={{ color: 'red', fontSize: '1.5em' }} />
            <h6>Passed</h6>
            <Badge pill bg="danger">{categorizedEvents.passed.length}</Badge>
            <Dropdown>
              <Dropdown.Toggle variant="link" size="sm" id="dropdown-passed">
                View
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {categorizedEvents.passed.length > 0 ? (
                  categorizedEvents.passed.map(event => (
                    <Dropdown.Item key={event.id} onClick={() => navigateToMap(event.id)}>
                      {event.title}
                    </Dropdown.Item>
                  ))
                ) : (
                  <Dropdown.Item>No passed events.</Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Col>
        <Col xs={12} md={3} className="mb-2 d-flex justify-content-center">
          <div style={{ textAlign: 'center', padding: '10px', border: '1px solid blue', borderRadius: '5px', width: '100%' }}>
            <FaClock style={{ color: 'blue', fontSize: '1.5em' }} />
            <h6>Pomodoro</h6>
            <p style={{ margin: '3px' }}>{isRunning ? (isSession ? 'Session' : 'Break') : 'Stopped'}</p>
            <p style={{ margin: '3px' }}>{isSession ? sessionLength : breakLength} M</p>
            <PomodoroProgress/>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default EventMap;
