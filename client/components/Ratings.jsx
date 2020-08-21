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
    return (
      <RatingBarStyle>
        <PriceStyle>
          ${this.props.listing.nightlyPrice} / night
        </PriceStyle>
        <RatingStyle>
          {this.props.listing.avgRating} ({this.props.listing.ratingNum})
        </RatingStyle>
      </RatingBarStyle>
    )
  }
}

const RatingBarStyle = styled.div`
  display: inline-grid;
  grid-template-columns: 50% 50%;
  height: 50px;
  width: 100%;
`;

const PriceStyle = styled.div`
  display: flex;
  grid-column-start: 1;
  grid-column-end: 2;
  font-size: 22px;
  font-weight: 600;
`;

const RatingStyle = styled.div`
  grid-column-start: 2;
  grid-column-end: 3;
  font-size: 14px;
  font-weight: 400;
  text-align: right;
`;

export default Ratings;