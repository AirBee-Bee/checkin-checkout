import React from 'react';

// listing
const Guests = ({listing, open, guests}) => (
  <div className="guests" onClick={open}>
    <div className="guest-string">
      Guests: {guests.adults + guests.children}
    </div>
    <div className="down-arrow">
      ^
    </div>
  </div>
);

export default Guests;
