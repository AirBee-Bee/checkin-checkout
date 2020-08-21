import React from 'react';
import moment from 'moment';
import CheckIn from './CheckIn.jsx';
import CheckOut from './CheckOut.jsx';
import styled from 'styled-components';

//listing, onCheckIn, onCheckOut}


const Calendar = ({listing, onCheckIn, onCheckOut, open, checkInDate, checkOutDate}) => (
  <CalendarBarStyle onClick={open}>
    <CheckIn checkInDate={checkInDate} onSelect={onCheckIn}/>
    <CheckOut checkOutDate={checkOutDate} onSelect={onCheckOut}/>
  </CalendarBarStyle>
);

const CalendarBarStyle = styled.div`
  display: flex;
  margin-right: auto;
  margin-left: auto;
  width: 100;
`;

export default Calendar;