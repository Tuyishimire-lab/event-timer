import React, {useEffect, useState} from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import EventForm from './components/EventForm';
import CountDownTimer from './components/CountDownTimer';
import { sortEventsByEndTime } from './utils/sort';

function App() {

  const [events, setEvents] = useState([]);
  const [eventToEdit, setEventToEdit] = useState(null);

  useEffect(()=>{
    const handleRecurringEvents = () =>{
      const now = new Date();
      const updatedEvents = events.map((event) =>{
        if(event.isRecurring && new Date(event.endDate) <= now){
          let newEndDate = new Date(event.endDate)
          switch (event.recurrencePattern) {
            case 'daily':
              newEndDate = new Date(event.endDate);
              newEndDate.setDate(newEndDate.getDate() + 1);
              break;
            case 'weekly':
              newEndDate = new Date(event.endDate);
              newEndDate.setDate(newEndDate.getDate() + 7);
              break;
            case 'monthly':
              newEndDate = new Date(event.endDate);
              newEndDate.setMonth(newEndDate.getMonth() + 1);
              break;
            case 'yearly':
              newEndDate = new Date(event.endDate);
              newEndDate.setFullYear(newEndDate.getFullYear() + 1);
              break;
            case 'custom':
              // Handle custom recurrence pattern if needed
              break;
            default:
              break;
          }
          return {...event, endDate: newEndDate.toISOString()};
        }
        return event;
      });
      setEvents(sortEventsByEndTime(updatedEvents))
    }
    handleRecurringEvents();
  }, [events]);

  const addEvent = (newEvent) => {
    setEvents((prevEvents) => sortEventsByEndTime([...prevEvents, { ...newEvent, id: Date.now() }]));
  };

  const editEvent = (updatedEvent) => {
    setEvents((prevEvents) => sortEventsByEndTime(prevEvents.map((event) => (event.id === updatedEvent.id ? updatedEvent : event))));
    setEventToEdit(null);
  };

  const deleteEvent = (id) => {
    setEvents((prevEvents) => sortEventsByEndTime(prevEvents.filter((event) => event.id !== id)));
  };

  const handleEdit = (event) => {
    setEventToEdit(event);
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <h1>Event Countdown Timer</h1>
          <EventForm addEvent={addEvent} editEvent={editEvent} eventToEdit={eventToEdit} />
          <ul>
            {events.map((event) => (
              <li key={event.id} style={{ borderLeft: `5px solid ${event.color}`, padding: '10px', margin: '10px 0' }}>
                <div>
                  <strong>{event.title}</strong> - {event.endDate} - {event.description}
                </div>
                <CountDownTimer endDate={event.endDate} />
                <Button variant="secondary" onClick={() => handleEdit(event)}>Edit</Button>
                <Button variant="danger" onClick={() => deleteEvent(event.id)}>Delete</Button>
              </li>
            ))}
          </ul>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
