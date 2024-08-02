import React, {forwardRef, useContext, useImperativeHandle, useRef} from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EventsContext } from '../EventsContext';


const Calendar = forwardRef((props, ref) => {

  const { events } = useContext(EventsContext);
  const calendarRef = useRef(null)

  const handleDateClick = (arg) => {
    console.log(arg.dateStr);
  };

  useImperativeHandle(ref, () => ({
    navigateToEvent: (eventId) => {
      const calendarApi = calendarRef.current.getApi();
      const event = events.find((e) => e.id === eventId);
      if (event) {
        calendarApi.gotoDate(event.startDate);
        calendarApi.select({ start: event.startDate, end: event.endDate, allDay: event.allDay }); // Navigate to the event date
      }
    },
  }));


  const formattedEvents = events.map(event => ({
    id: event.id,
    title: event.title,
    start: event.startDate,
    end: event.endDate,
    color: event.color,
    backgroundColor: event.color,
    borderColor: event.color, 
  }));

  

  return (
    <FullCalendar
      ref={calendarRef}
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      events={formattedEvents}
      dateClick={handleDateClick}
    //   themeSystem='bootstrap'
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      }}
    />
  );
});

export default Calendar;
