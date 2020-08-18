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
        <div className="ratings-bar">
          <PriceStyle>
            <div className="nightly-price">
              ${this.props.listing.nightlyPrice}
              <div className="price-description">
                / night
              </div>
            </div>
          </PriceStyle>
          <div className="ratings">
            <div className="average-rating">
              {this.props.listing.avgRating}
            </div>
            <div className="rating-num">
              ({this.props.listing.ratingNum})
            </div>
          </div>
        </div>
      </RatingBarStyle>
    )
  }
}

const RatingBarStyle = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-evenly;
`;

const PriceStyle = styled.div`
  font-size: 22px;
  display: inline;
  font-weight: 600;
  margin-right: 30px
`;

export default Ratings;