import React from 'react';

// const ratingsStyle = {
//   display: inline-block
// };
// takes in listing
class Ratings extends React.Component {
  constructor (props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div className="ratings-bar">
        <h4>{listing.nightlyPrice}</h4>
        <h4>{listing.avgRating}</h4>
        <h5>({listing.ratingNum})</h5>
      </div>
    )
  }
}

export default Ratings;