import React, { useState } from 'react';
import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Navbar from '../components/Navbar/Navbar';

const locales = {
  'en-US': enUS,
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

function mapTasksToEvents(tasks) {
  return tasks.map((task) => {
    const start = task.createdAt ? new Date(task.createdAt) : new Date();
    // Set end to the same as start for a point event
    const end = start;
    return {
      id: task._id,
      title: task.title,
      start,
      end,
      desc: task.description,
      status: task.status,
      createdAt: task.createdAt,
    };
  });
}

const eventStyleGetter = (event) => {
  let bgColor = '#2ee59d';
  if (event.status === 'done') bgColor = '#2ee59d';
  else if (event.status === 'in-progress') bgColor = '#ff9f43';
  else if (event.status === 'pending') bgColor = '#ff5b5b';
  return {
    style: {
      backgroundColor: bgColor,
      borderRadius: '8px',
      color: '#fff',
      border: 'none',
      fontWeight: 600,
      fontSize: 15,
      boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
    },
  };
};

// Custom event wrapper to set only the desired tooltip
const CustomEventWrapper = ({ event, children }) => {
  const time = event.createdAt ? format(new Date(event.createdAt), 'HH:mm') : '';
  return (
    <div title={time ? `Added: ${time}` : ''}>
      {children}
    </div>
  );
};

const CalendarPage = ({ tasks = [], user, onLogout }) => {
  const events = mapTasksToEvents(tasks);
  const [currentDate, setCurrentDate] = useState(new Date());
  return (
    <>
      <Navbar user={user} onLogout={onLogout} />
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 16px' }}>
        <h2 style={{ fontWeight: 700, color: '#222b45', marginBottom: 24 }}>Task Calendar</h2>
        <BigCalendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600, background: '#fff', borderRadius: 18, boxShadow: '0 2px 12px rgba(0,0,0,0.04)', padding: 16 }}
          views={['day']}
          defaultView="day"
          date={currentDate}
          onNavigate={setCurrentDate}
          eventPropGetter={eventStyleGetter}
          tooltipAccessor={null}
          components={{
            event: ({ event }) => (
              <div>
                <div>{event.title}</div>
                {event.desc && <div style={{ fontSize: 12, fontWeight: 400 }}>{event.desc}</div>}
              </div>
            ),
            eventWrapper: CustomEventWrapper,
          }}
        />
      </div>
    </>
  );
};

export default CalendarPage; 