import React from 'react';
import moment from 'moment';
import CheckIn from './CheckIn.jsx';
import CheckOut from './CheckOut.jsx';

//listing, onCheckIn, onCheckOut}


const Calendar = ({listing, onCheckIn, onCheckOut, open}) => (
  <div className="calendar" onClick={open}>
    <CheckIn onSelect={onCheckIn}/>
    <CheckOut onSelect={onCheckOut}/>
  </div>
);

export default Calendar;