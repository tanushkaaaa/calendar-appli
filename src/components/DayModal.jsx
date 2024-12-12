import React, { useState, useEffect } from 'react';

const EventForm = ({ onSubmit, selectedDate, currentEvent, eventData }) => {
  const [name, setName] = useState(eventData?.name || '');
  const [startTime, setStartTime] = useState(eventData?.startTime || '');
  const [endTime, setEndTime] = useState(eventData?.endTime || '');
  const [description, setDescription] = useState(eventData?.description || '');

  const handleSubmit = (e) => {
    e.preventDefault();

    const event = {
      name,
      startTime,
      endTime,
      description,
    };

    onSubmit(event); // Submit event to the parent component (Calendar)
  };

  useEffect(() => {
    if (currentEvent !== null && eventData) {
      setName(eventData.name);
      setStartTime(eventData.startTime);
      setEndTime(eventData.endTime);
      setDescription(eventData.description);
    }
  }, [currentEvent, eventData]);

  return (
    <div className="event-form-modal">
      <form onSubmit={handleSubmit}>
        <h2>{currentEvent === null ? 'Add Event' : 'Edit Event'}</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Event Name"
          required
        />
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          placeholder="Start Time"
          required
        />
        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          placeholder="End Time"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Event Description"
        ></textarea>
        <button type="submit">{currentEvent === null ? 'Add' : 'Save'} Event</button>
      </form>
    </div>
  );
};

export default EventForm;
