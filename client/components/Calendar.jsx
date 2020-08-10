import React from 'react';

const Calendar = ({listing, chooseDates}) => (
  <div className="calendar">
    <div className="calendar-input">
      <input
        type="date"
        id="check-in"
        placeholder="Add Date"
      />
      <input
        type="date"
        id="check-out"
        placeholder = "Add Date"
      />
    </div>
  </div>
);

export default Calendar;