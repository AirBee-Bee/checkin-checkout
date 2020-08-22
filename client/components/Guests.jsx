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
    <String adults={guests.adults} kids={guests.children} babies={guests.infants} />
    <ArrowStyle>
      ▼
    </ArrowStyle>
  </GuestStyle>
);

const GuestStyle = styled.div`
  display: flex;
  width: 100%;
`;

const ArrowStyle = styled.div`
  display: flex;
  text-align: right;
`;

export default Guests;
