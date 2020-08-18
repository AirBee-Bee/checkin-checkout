import React from 'react';

//{listing, chooseDates, onSelect}
const CheckOut = ({listing, chooseDates, onSelect}) => (
  <div className="calendar-input-checkout">
    <input
      onClick={onSelect}
      type="text"
      id="check-out"
      placeholder="CHECK-OUT"
    />
  </div>

);

export default CheckOut;