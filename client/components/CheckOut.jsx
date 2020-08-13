import React from 'react';

//{listing, chooseDates, onSelect}
class CheckOut extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render () {
    return (
      <div className="calendar-input-checkout">
        <input
          onClick={onSelect}
          type="date"
          id="check-out"
        />
      </div>
    )
  }
}

export default CheckOut;