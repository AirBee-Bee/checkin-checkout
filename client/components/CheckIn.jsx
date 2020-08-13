import React from 'react';

const CheckIn = ({listing, chooseDates, onSelect}) => (
  <div className="calendar-input-checkin">
    <input
      onClick={onSelect}
      type="date"
      id="check-in"
    />
  </div>
);

export default CheckIn;