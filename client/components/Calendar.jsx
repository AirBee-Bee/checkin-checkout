import React from 'react';
import CheckIn from './CheckIn.jsx';
import CheckOut from './CheckOut.jsx';

const Calendar = ({listing, onCheckIn, onCheckOut}) => (
  <div className="calendar">
    <CheckIn onSelect={onCheckIn}/>
    <CheckOut onSelect={onCheckOut}/>
  </div>
);

export default Calendar;