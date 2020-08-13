import React from 'react';

const CheckOut = ({listing, chooseDates, onSelect}) => (
  <div className="calendar-input-checkout">
    <input
      onClick={onSelect}
      type="date"
      id="check-out"
    />
  </div>
);

export default CheckOut;