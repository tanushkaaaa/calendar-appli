import React from 'react';
import CalendarGrid from './components/CalendarGrid'; // Import the calendar component
import './App.css'; // App-specific styling

const App = () => {
  return (
    <div className="app-container">
      <h1>Event Calendar</h1>
      <CalendarGrid />
    </div>
  );
};

export default App;
