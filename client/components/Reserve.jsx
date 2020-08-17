import React from 'react';

// {onSubmit, datesSelected, listing}
class Reserve extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div className="reserve">
        <button id="submit-category">Reserve</button>
      </div>
    )
  }
}

export default Reserve;