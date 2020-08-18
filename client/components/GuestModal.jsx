import React from 'react';

const GuestModal = ({close, guests, listing, addAdult, addChildren, addInfant}) => (
  <div className="guests">
    <div className="adults">
      Adults
      <div className="guest-button adults">
        <button>-</button>
        {guests.adults}
        <button onClick={addAdult}>+</button>
      </div>
    </div>
    <div className="children">
      Children
      <div className="descriptor children">
        Ages 2-12
      </div>
      <div className="guest-button children">
        <button>-</button>
        {guests.children}
        <button onClick={addChildren}>+</button>
      </div>
    </div>
    <div className="infants">
      Infants
      <div className="descriptor infants">
        Under 2
      </div>
      <div className="guest-button infant">
        <button>-</button>
        {guests.infants}
        <button onClick={addInfant}>+</button>
      </div>
    </div>
    <div className="guest-description">
      {listing.numberOfGuests} guests maximum. Infants don't count toward the number of guests.
    </div>
    <div className="close-guest">
      <div onClick={close}>
        Close
      </div>
    </div>
  </div>
);

export default GuestModal;