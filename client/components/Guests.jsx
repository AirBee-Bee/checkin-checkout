import React from 'react';
import styled from 'styled-components';

// listing
function String(props) {
  var string = '';
  if (props.babies === 0) {
    if ((props.adults + props.kids) === 1) {
      string = "1 guest";
      return string;
    } else {
      string = (props.adults + props.kids) + ' guests'
      return string;
    }
  } else if (props.babies === 1) {
    if ((props.adults + props.kids) === 1) {
      string = "1 guest, 1 infant";
      return string;
    } else {
      string = (props.adults + props.kids) + ' guests, 1 infant'
      return string;
    }
  } else {
    if ((props.adults + props.kids) === 1) {
      string = "1 guest, " + props.babies + ' infants';
      return string;
    } else {
      string = (props.adults + props.kids) + ' guests, ' + props.babies + ' infants';
      return string;
    }
  }
}
const Guests = ({listing, open, guests}) => (
  <GuestStyle onClick={open}>
    <StringStyle>
      <String adults={guests.adults} kids={guests.children} babies={guests.infants} />
    </StringStyle>
    <ArrowStyle>
      ▼
    </ArrowStyle>
  </GuestStyle>
);

const GuestStyle = styled.div`
  display: flex;
  border-top: 1px solid rgb(221, 221, 221);
  width: 100%;
  font-size: 16px;
  justify-content: space-between;
  font-weight: 400;
  height: 56px;
  cursor: pointer;
`;

const StringStyle = styled.div`
  padding: 26px 36px 10px 12px;
  font-size: 14px;
`;

const ArrowStyle = styled.div`
  margin-right: 15px;
  margin-top: auto;
  margin-bottom: auto;
`;

export default Guests;
