import React from 'react';

const EventList = ({ events, onEdit, onDelete }) => {
  return (
    <div className="event-list">
      {events.map((event, index) => (
        <div
          key={index}
          className={`event-item ${event.isNew ? 'new-event' : ''}`}
        >
          <div>{event.name}</div>
          <div>{event.startTime} - {event.endTime}</div>
          <button onClick={() => onEdit(index)}>Edit</button>
          <button onClick={() => onDelete(index)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default EventList;
