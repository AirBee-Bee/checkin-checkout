import React from 'react';

//{listing, chooseDates, onSelect}
const CheckOut = ({listing, chooseDates, onSelect, checkOutDate}) => (
  <div className="calendar-input-checkout">
    <input
      onClick={onSelect}
      type="text"
      id="check-out"
      placeholder={checkOutDate}
    />
  </div>

);

export default CheckOut;