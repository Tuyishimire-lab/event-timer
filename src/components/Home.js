// Home.js
import React, { useEffect, useState, useContext, useCallback } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import EventForm from './EventForm';
import { sortEventsByEndTime } from '../utils/sort';
import Event from './Event';
import EventMap from './EventMap';
import { EventsContext } from '../EventsContext';
import { useNavigate } from 'react-router-dom';

function Home({navigateToEvent}) {

  const navigate = useNavigate();

  const navigateMap = (eventId) =>{
    navigate(`/calendar?eventId=${eventId}`);
  };
  const { events, setEvents } = useContext(EventsContext);
  const [eventToEdit, setEventToEdit] = useState(null);

  const handleRecurringEvents = useCallback(() => {
    const now = new Date();
    const updatedEvents = events.map((event) => {
      if (event.isRecurring) {
        const eventEndDate = new Date(event.endDate);
        const eventStartDate = new Date(event.startDate);

        if (eventEndDate <= now) {
          let newStartDate = new Date(eventStartDate);
          let newEndDate = new Date(eventEndDate);

          switch (event.recurrencePattern) {
            case 'daily':
              newStartDate.setDate(newStartDate.getDate() + 1);
              newEndDate.setDate(newEndDate.getDate() + 1);
              break;
            case 'weekly':
              newStartDate.setDate(newStartDate.getDate() + 7);
              newEndDate.setDate(newEndDate.getDate() + 7);
              break;
            case 'monthly':
              newStartDate.setMonth(newStartDate.getMonth() + 1);
              newEndDate.setMonth(newEndDate.getMonth() + 1);
              break;
            case 'yearly':
              newStartDate.setFullYear(newStartDate.getFullYear() + 1);
              newEndDate.setFullYear(newEndDate.getFullYear() + 1);
              break;
            case 'custom':
              // Handle custom recurrence pattern if needed
              break;
            default:
              break;
          }
          return { ...event, startDate: newStartDate.toISOString(), endDate: newEndDate.toISOString() };
        }
      }
      return event;
    });

    if (JSON.stringify(updatedEvents) !== JSON.stringify(events)) {
      setEvents(sortEventsByEndTime(updatedEvents));
    }
  }, [events, setEvents]);

  useEffect(() => {
    handleRecurringEvents();
  }, [handleRecurringEvents]);

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
    <Container style={{margin: '0 auto'}}>
      <Row className="justify-content-md-center">
        <Col md="auto" className='home-content'>
          <h2 style={{textAlign:'center'}}>Event Countdown Timer</h2>
          <EventMap navigateToMap={navigateMap}/>
          <EventForm addEvent={addEvent} editEvent={editEvent} eventToEdit={eventToEdit} />
          <Row className='events'>
            {events.map((event) => (
              <Event
                key={event.id}
                event={event}
                handleEdit={handleEdit}
                deleteEvent={deleteEvent}
                navigateToEvent={navigateToEvent}
              />
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
