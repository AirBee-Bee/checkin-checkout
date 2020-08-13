import React from 'react';
import CheckIn from './CheckIn.jsx';
import CheckOut from './CheckOut.jsx';

//listing, onCheckIn, onCheckOut}

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render () {
    return (
      <div className="calendar">
        <CheckIn onSelect={onCheckIn}/>
        <CheckOut onSelect={onCheckOut}/>
      </div>
    )
  }
}

export default Calendar;