import React from 'react';

//{listing, chooseDates, onSelect}

const CheckIn = ({listing, chooseDates, onSelect}) => (
  <div className="calendar-input-checkin">
    <input
      onClick={onSelect}
      type="input"
      id="check-in"
      placeholder="CHECK-IN"
    />
  </div>

);

export default CheckIn;