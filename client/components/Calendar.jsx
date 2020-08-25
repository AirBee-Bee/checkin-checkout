import React from 'react';
import moment from 'moment';
import CheckIn from './CheckIn.jsx';
import CheckOut from './CheckOut.jsx';
import styled from 'styled-components';

//listing, onCheckIn, onCheckOut}


const Calendar = ({listing, onCheckIn, onCheckOut, open, checkInDate, checkOutDate}) => (
  <CalendarBarStyle onClick={open}>
    <CheckInStyle>
      <CheckIn checkInDate={checkInDate} onSelect={onCheckIn}/>
    </CheckInStyle>
    <CheckOutStyle>
      <CheckOut checkOutDate={checkOutDate} onSelect={onCheckOut}/>
    </CheckOutStyle>
  </CalendarBarStyle>
);

const CalendarBarStyle = styled.div`
  display: flex;
  justify-content: space-between;
  margin-right: auto;
  margin-left: auto;
  width: 100%;
  grid-template-columns: 50% 50%;
`;

const CheckInStyle = styled.div`
  width: 100%;
  grid-column-start: 1;
  grid-column-end: 2;
  flex-grow: 3;
`;
const CheckOutStyle = styled.div`
  width: 100%;
  grid-column-start: 2;
  grid-column-end: 3;
  flex-grow: 3;
`;

export default Calendar;