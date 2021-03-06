import React from 'react';
import styled from 'styled-components';

class Calculation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weekly: false,
      monthly: false,
    };
    // this.weeklyDiscount = this.weeklyDiscount.bind(this);
    // this.monthlyDiscount = this.monthlyDiscount.bind(this);
    // this.total = this.total.bind(this);
  }

  weeklyDiscount() {
    if (this.props.listing.weeklyPrice === true && this.props.night >= 7 && this.props.night < 28) {
      this.setState({
        weekly: true,
        monthly: false,
      }, () => {
        let discount = this.props.listing.nightlyPrice * 0.25;
        return discount;
      })
    }
  }

  monthlyDiscount() {
    if (this.props.listing.monthlyPrice === true && this.props.night >= 28) {
      this.setState({
        weekly: false,
        monthly: true
      }, () => {
        let discount = this.props.listing.nightlyPrice * 0.35;
        return discount;
      })
    }
  }



  render() {
    if (this.props.night !== 0) {
      return (
        <CalculationStyle>
          <AccomodationStyle>
            Accomodation
            ${this.props.nightlyPrice*this.props.night} {"\n"}
          </AccomodationStyle>
          <CleaningFeeStyle>
            Cleaning fee
            ${this.props.listing.cleaningFee} {"\n"}
          </CleaningFeeStyle>
          <ServiceFeeStyle>
            Service fee
            ${this.props.night*this.props.listing.serviceBase} {"\n"}
          </ServiceFeeStyle>
          <TaxesStyle>
            Occupancy taxes and fees
            ${this.props.night*this.props.listing.taxesBase} {"\n"}
          </TaxesStyle>
          <TotalCalculationStyle>
            Total
            ${this.props.totalPrice}
          </TotalCalculationStyle>
        </CalculationStyle>
      );
    } else {
      return null;
    }
  }
}

const CalculationStyle = styled.div`
  justify-content: space-between;
  flex-flow: column wrap;
  width: 100%;
  line-height: 20px;
  font-weight: 400;
`;

const TotalCalculationStyle = styled.div`
  width: 100%;
  border-top: 1px solid rgb(221, 221, 221);
  font-size: 16px;
  font-weight: 800;
  margin-top: 16px;
  padding-top: 24px;

`;

const AccomodationStyle = styled.div`
  width: 100%;
  padding-bottom: 12px;
`;

const CleaningFeeStyle = styled.div`
  width: 100%;
  padding-bottom: 12px;
`;

const ServiceFeeStyle = styled.div`
  width: 100%;
  padding-bottom: 12px;
`;

const TaxesStyle = styled.div`
  width: 100%;
  padding-bottom: 12px;
`;
export default Calculation;
