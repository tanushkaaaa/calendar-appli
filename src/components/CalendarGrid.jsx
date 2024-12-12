import React, { useState,useEffect } from 'react';
import '../styles/calendar.css';
import EventList from './EventList';
import EventForm from './EventForm';

const CalendarGrid = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [events, setEvents] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);

  // Load events from localStorage
  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('calendarEvents')) || {};
    setEvents(storedEvents);
  }, []);

  // Save events to localStorage
  useEffect(() => {
    localStorage.setItem('calendarEvents', JSON.stringify(events));
  }, [events]);

  // Get the first day of the current month
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  // Get the total number of days in the current month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Handle next and previous month navigation
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  const handleDayClick = (day) => {
    const dateKey = `${currentYear}-${currentMonth}-${day}`;
    setSelectedDate(dateKey);
    setShowModal(true);
    setCurrentEvent(null); // Reset current event when selecting a new day
  };

  const handleEventSubmit = (eventData) => {
    if (!selectedDate) return;
  
    // Check for overlapping events
    const newEventStartTime = new Date(`${selectedDate} ${eventData.startTime}`);
    const newEventEndTime = new Date(`${selectedDate} ${eventData.endTime}`);
  
    const updatedEvents = { ...events };
  
    // Ensure there are events on the selected date
    if (!updatedEvents[selectedDate]) updatedEvents[selectedDate] = [];
  
    // Check if the new event overlaps with any existing event
    for (const event of updatedEvents[selectedDate]) {
      const existingEventStartTime = new Date(`${selectedDate} ${event.startTime}`);
      const existingEventEndTime = new Date(`${selectedDate} ${event.endTime}`);
  
      if (
        (newEventStartTime >= existingEventStartTime && newEventStartTime < existingEventEndTime) ||
        (newEventEndTime > existingEventStartTime && newEventEndTime <= existingEventEndTime) ||
        (newEventStartTime <= existingEventStartTime && newEventEndTime >= existingEventEndTime)
      ) {
        alert("Event time overlaps with an existing event.");
        return; // Prevent event submission if there's an overlap
      }
    }
  
    // If no overlap, add or update the event
    if (currentEvent === null) {
      // Add new event
      updatedEvents[selectedDate].push(eventData);
    } else {
      // Edit existing event
      const updatedEventList = updatedEvents[selectedDate].map((event, index) =>
        index === currentEvent ? eventData : event
      );
      updatedEvents[selectedDate] = updatedEventList;
    }
  
    setEvents(updatedEvents);
    setShowModal(false);
  };
  

  const handleEventDelete = (index) => {
    if (!selectedDate) return;

    const updatedEvents = { ...events };
    updatedEvents[selectedDate].splice(index, 1);
    setEvents(updatedEvents);
  };

  const handleEventEdit = (index) => {
    setCurrentEvent(index);
    
  };

  const generateCalendarDays = () => {
    const calendarDays = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push(<div key={`empty-${i}`} className="day empty"></div>);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = `${currentYear}-${currentMonth}-${day}`;
      const isToday =
        day === today.getDate() &&
        currentMonth === today.getMonth() &&
        currentYear === today.getFullYear();
      const hasEvents = events[dateKey] && events[dateKey].length > 0;

      // Determine if the day is a weekend or a weekday
      const dayOfWeek = new Date(currentYear, currentMonth, day).getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

      calendarDays.push(
        <div
          key={day}
          className={`day ${isToday ? 'today' : ''} ${hasEvents ? 'has-events' : ''} ${isWeekend ? 'weekend' : 'weekday'}`}
          onClick={() => handleDayClick(day)}
        >
          {day}
        </div>
      );
    }
    return calendarDays;
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={handlePrevMonth}>Prev</button>
        <h2>
          {new Date(currentYear, currentMonth).toLocaleString('default', {
            month: 'long',
          })}{' '}
          {currentYear}
        </h2>
        <button onClick={handleNextMonth}>Next</button>
      </div>
      <div className="calendar-days">
        <div className="day-label">Sun</div>
        <div className="day-label">Mon</div>
        <div className="day-label">Tue</div>
        <div className="day-label">Wed</div>
        <div className="day-label">Thu</div>
        <div className="day-label">Fri</div>
        <div className="day-label">Sat</div>
        {generateCalendarDays()}
      </div>

      {showModal && (
        <div className="modal">
          <h3>Events for {selectedDate}</h3>
          <EventList 
            events={events[selectedDate] || []} 
            onEdit={handleEventEdit} 
            onDelete={handleEventDelete} 
          />
          <EventForm
            event={currentEvent !== null ? events[selectedDate][currentEvent] : null}
            onSubmit={handleEventSubmit}
            onCancel={() => setShowModal(false)}
          />
        </div>
      )}
    </div>
  );
};

export default CalendarGrid;
