import React from 'react';

const GuestModal = ({close, guests}) => (
  <div className="guests">
    <div className="adults">
      Adults
      <button>-</button>
      {guests.adults}
      <button>+</button>
    </div>
    <div className="children">
      Children
      <button>-</button>
      {guests.children}
      <button>+</button>
    </div>
    <div className="infants">
      Infants
      <button>-</button>
      {guests.infants}
      <button>+</button>
    </div>
    <div className="close-guest">
      <div onClick={close}>
        close
      </div>
    </div>
  </div>
);

export default GuestModal;