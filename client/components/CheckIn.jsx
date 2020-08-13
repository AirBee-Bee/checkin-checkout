import React from 'react';

//{listing, chooseDates, onSelect}

class CheckIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render () {
    return (
      <div className="calendar-input-checkin">
        <input
          onClick={onSelect}
          type="date"
          id="check-in"
        />
      </div>
    )
  }
}

export default CheckIn;