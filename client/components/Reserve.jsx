import React from 'react';

const Reserve = ({onSubmit, datesSelected, listing}) => (
  <div className="reserve">
    <button id="submit-category" onClick={onSubmit}>Reserve</button>
  </div>
);

export default Reserve;