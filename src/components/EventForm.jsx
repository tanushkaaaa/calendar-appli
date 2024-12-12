import React, { useState, useEffect } from 'react';

const EventForm = ({ event, onSubmit, onCancel }) => {
  const [eventName, setEventName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [description, setDescription] = useState('');

  // If an event is being edited, fill the form with its current data
  useEffect(() => {
    if (event) {
      setEventName(event.name);
      setStartTime(event.startTime);
      setEndTime(event.endTime);
      setDescription(event.description || ''); // Use empty string if no description
    }
  }, [event]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const eventData = { name: eventName, startTime, endTime, description };
    onSubmit(eventData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Event Name</label>
        <input
          type="text"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />
      </div>
      <div>
        <label>Start Time</label>
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
      </div>
      <div>
        <label>End Time</label>
        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
      </div>
      <div>
        <label>Description (Optional)</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default EventForm;
