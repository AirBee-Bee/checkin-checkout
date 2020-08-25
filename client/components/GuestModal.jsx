import React from 'react';
import styled from 'styled-components';

const GuestModal = ({close, guests, listing, addAdult, addChildren, addInfant, subAdult, subChildren, subInfant}) => (
  <GuestStyle>
    <div className="adults">
      Adults
      <div className="guest-button adults">
        <button onClick={subAdult}>-</button>
        {guests.adults}
        <button onClick={addAdult}>+</button>
      </div>
    </div>
    <br/>
    <div className="children">
      Children
      <div className="descriptor children">
        Ages 2-12
      </div>
      <div className="guest-button children">
        <button onClick={subChildren}>-</button>
        {guests.children}
        <button onClick={addChildren}>+</button>
      </div>
    </div>
    <br/>
    <div className="infants">
      Infants
      <div className="descriptor infants">
        Under 2
      </div>
      <div className="guest-button infant">
        <button onClick={subInfant}>-</button>
        {guests.infants}
        <button onClick={addInfant}>+</button>
      </div>
    </div>
    <br/>
    <div className="guest-description">
      {listing.numberOfGuests} guests maximum. Infants don't count toward the number of guests.
    </div>
    <br/>
    <div className="close-guest">
      <div onClick={close}>
        Close
      </div>
    </div>
  </GuestStyle>
);

const GuestStyle = styled.div`
  display: flex;
  flex-flow: column wrap;
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif !important;
  width: auto;
  height: auto;
`;


export default GuestModal;