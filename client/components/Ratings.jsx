import React from 'react';
import styled from 'styled-components';

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
    const RatingStyle = styled.div`
      display: inline-block;
    `;
    return (
      <RatingStyle>
        <div className="ratings-bar">
          <div className="nightly-price">{this.props.listing.nightlyPrice}</div>
          <div className="ratings">
            <div className="average-rating">{this.props.listing.avgRating}</div>
            <div className="rating-num">({this.props.listing.ratingNum})</div>
          </div>
        </div>
      </RatingStyle>
    )
  }
}

export default Ratings;