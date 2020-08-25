import React from 'react';
import styled from 'styled-components';

// {onSubmit, datesSelected, listing}
class Reserve extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    if (this.props.night !== 0) {
      return (
        <ReserveStyle>
          <button id="submit-category">Reserve</button>
        </ReserveStyle>
      );
    } else {
      return null;
    }
  }
}

const ReserveStyle = styled.div`
  width: 100%;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  margin-top: 10px;
  margin-bottom: 15px;
  margin-right: auto;
  margin-left: auto;
`;

export default Reserve;