import React from 'react';

//{listing, chooseDates, onSelect}

const CheckIn = ({listing, chooseDates, onSelect, checkInDate}) => (
  <div className="calendar-input-checkin">
    <input
      onClick={onSelect}
      type="input"
      id="check-in"
      placeholder={checkInDate}
    />
  </div>

);

export default CheckIn;