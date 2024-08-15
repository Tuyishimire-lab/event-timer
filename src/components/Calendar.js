import React, { forwardRef, useContext, useImperativeHandle, useRef } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { EventsContext } from '../EventsContext';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const Calendar = forwardRef((props, ref) => {
  const { events } = useContext(EventsContext);
  const calendarRef = useRef(null);

  useImperativeHandle(ref, () => ({
    navigateToEvent: (eventId) => {
      const event = events.find((e) => e.id === eventId);
      if (event) {
        const calendarApi = calendarRef.current;
        // Use navigate to go to the event's start date
        calendarApi.props.onNavigate(event.start);
      }
    },
  }));

  const formattedEvents = events.map(event => ({
    id: event.id,
    title: event.title,
    start: new Date(event.startDate),
    end: new Date(event.endDate),
    allDay: event.allDay,
    color: event.color,
  }));

  const eventPropGetter = (event) => {
    const backgroundColor = event.color;
    return { style: { backgroundColor } };
  };

  return (
    <div className="calendar-container">
      <BigCalendar
        ref={calendarRef}
        localizer={localizer}
        events={formattedEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        eventPropGetter={eventPropGetter}
        selectable
        onSelectEvent={(event) => console.log(event)}
      />
    </div>
  );
});

export default Calendar;
