import React from 'react';
import styled from 'styled-components';

//{listing, chooseDates, onSelect}
const CheckOut = ({listing, chooseDates, onSelect, checkOutDate}) => (
  <CheckOutStyle>
    <input
      onClick={onSelect}
      type="text"
      id="check-out"
      placeholder={checkOutDate}
    />
  </CheckOutStyle>
);

const CheckOutStyle = styled.div`
  width: 100%;
`;

export default CheckOut;