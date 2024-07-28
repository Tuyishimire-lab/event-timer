// Calendar.js
import React, {useContext} from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EventsContext } from '../EventsContext';


const Calendar = () => {

    const { events } = useContext(EventsContext);
    const handleDateClick = (arg) => {
    // Handle date click event
    console.log(arg.dateStr);
  };

  const formattedEvents = events.map(event => ({
    title: event.title,
    start: event.startDate,
    end: event.endDate,
    color: event.color,
    backgroundColor: event.color,
    borderColor: event.color 
  }));

  

  return (
    <FullCalendar
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
};

export default Calendar;
