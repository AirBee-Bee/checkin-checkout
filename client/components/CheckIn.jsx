import React from 'react';
import styled from 'styled-components';

//{listing, chooseDates, onSelect}

const CheckIn = ({listing, chooseDates, onSelect, checkInDate}) => (
  <CheckInStyle>
    <input
      onClick={onSelect}
      type="input"
      id="check-in"
      placeholder={checkInDate}
    />
  </CheckInStyle>
);

const CheckInStyle = styled.div`
  width: 100%;
`;

export default CheckIn;