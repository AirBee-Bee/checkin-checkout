import React from 'react';
import axios from 'axios';
import moment from 'moment';
import styled from 'styled-components';
import ReactModal from 'react-modal';

import Calendar from './components/Calendar.jsx';
import Calculation from './components/Calculation.jsx';
import Guests from './components/Guests.jsx';
import Reserve from './components/Reserve.jsx';
import Ratings from './components/Ratings.jsx';
import CheckIn from './components/CheckIn.jsx';
import CheckOut from './components/CheckOut.jsx';
import GuestModal from './components/GuestModal.jsx';
import CalendarModal from './components/CalendarModal.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datesSelected: [],
      checkIn: "CHECK-IN",
      checkOut: "CHECK-OUT",
      listing: [],
      today: null,
      guestModal: false,
      calendarModal: false,
      guests: {
        adults: 1,
        children: 0,
        infants: 0
      },
      selectedCheckIn: false,
      selectedCheckOut: false,
      numberOfNights: 0,
      nightlyPriceWGuests: 0,
      totalPrice: 0,
    }
    this.getListing = this.getListing.bind(this);
    this.openGuests = this.openGuests.bind(this);
    this.closeGuests = this.closeGuests.bind(this);
    this.openCalendar = this.openCalendar.bind(this);
    this.closeCalendar = this.closeCalendar.bind(this);
    this.chooseCheckIn = this.chooseCheckIn.bind(this);
    this.chooseCheckOut = this.chooseCheckOut.bind(this);
    this.clearDates = this.clearDates.bind(this);
    this.selectCheckIn = this.selectCheckIn.bind(this);
    this.selectCheckOut = this.selectCheckOut.bind(this);
    this.addAdult = this.addAdult.bind(this);
    this.addChildren = this.addChildren.bind(this);
    this.addInfant = this.addInfant.bind(this);
    this.subAdult = this.subAdult.bind(this);
    this.subChildren = this.subChildren.bind(this);
    this.subInfant = this.subInfant.bind(this);
    this.nightlyPriceCalc = this.nightlyPriceCalc.bind(this);
    this.total = this.total.bind(this);
    this.modalClearDates = this.modalClearDates.bind(this);
  }

  componentDidMount() {
    this.getListing();
    this.todaysDate();
  }

  getListing() {
    var id = window.location.href.split('/');
    axios.get(`/listing/${id[4]}/rooms`)
      .then((listingData) => {
        this.setState({
          listing: listingData.data[0]
        }, () => {
          console.log('weeklyprice', this.state.listing.weeklyPrice);
          console.log('monthlyprice', this.state.listing.monthlyPrice);
        })
      })
  }

  reserve() {
    axios.put('/listing/:id')
      .then(() => {
        console.log('Reserved')
      })
  }

  selectCheckIn() {
    this.setState({
      selectedCheckIn: true,
      selectedCheckOut: false
    })
  }

  selectCheckOut() {
    this.setState({
      selectedCheckIn: false,
      selectedCheckOut: true
    })
  }

  chooseCheckIn(day) {
    var checkInMoment = moment(day, "MMDDYYYY").format('L')
    this.setState({ checkIn: checkInMoment }, () => {
      console.log('checkin updated', this.state.checkIn)
      this.checkDays();

    })
  }

  chooseCheckOut(day) {
    var checkOutMoment = moment(day, "MMDDYYYY").format('L');
    this.setState({ checkOut: checkOutMoment }, () => {
      console.log('checkout updated', this.state.checkOut)
      this.checkDays();
    })
  }

  checkDays() {
    if(this.state.checkIn > this.state.checkOut && this.state.checkOut !== "CHECK-OUT" && this.state.checkIn !== "CHECK-IN") {
      alert('choose a valid checkin time');
      this.clearDates(3);
    } else {
      if (this.state.checkIn < this.state.today && this.state.checkIn !== "CHECK-IN") {
        alert('choose a valid checkin time');
        this.clearDates(1)
      } else if (this.state.checkOut < this.state.today && this.state.checkOut !== "CHECK-OUT") {
        alert('choose a valid checkout time');
        this.clearDates(2)
      } else if (this.state.checkOut !== "CHECK-OUT" && this.state.checkIn !== "CHECK-IN"){
        this.setDates();
        this.nightlyPriceCalc();
        this.total();
      }
    }
  }

  clearDates(val) {
    console.log('clear dates is firing')
    if (val === 1) {
      this.setState({ checkIn: "CHECK-IN" })
    }
    if (val === 2) {
      this.setState({ checkOut: "CHECK-OUT" })
    }
    if (val === 3 || arguments.length === 0) {
      this.setState({
        checkIn: "CHECK-IN",
        checkOut: "CHECK-OUT"
      })
    }
  }

  modalClearDates() {
    this.setState({numberOfNights: 0}, () => {
      this.clearDates(3);
    })
  }

  setDates() {
    this.setState({ datesSelected: [] })

    let firstDay = moment(this.state.checkIn, "L");
    console.log('firstday', firstDay)
    let lastDay = moment(this.state.checkOut, "L");
    let difference = lastDay.diff(firstDay, "days");
    let datesArr = [];
    if (this.state.listing.maxNights < difference) {
      alert('exceeded the maximum number of nights');
      this.clearDates(3)
    } else if (this.state.listing.minNights > difference) {
      alert('have not met the minimum requirement for number of nights');
      this.clearDates(3);
    } else {
      let index = 0;
      while (index <= difference) {
        datesArr.push(moment(firstDay, "L").add(index, "days").format("L"));
        index++;
      }
      console.log(datesArr)
      this.setState({
        datesSelected: datesArr,
        numberOfNights: difference
      }, () => {
        this.nightlyPriceCalc();
        this.total();
      })
    }
  }

  todaysDate() {
    var date = moment().format('L');
    this.setState({ today: date })
  }

  addAdult() {
    if ((this.state.guests.adults + this.state.guests.children) < this.state.listing.numberOfGuests) {
      var addedAdult = this.state.guests.adults + 1;
      this.setState(prevState => {
        let guests = Object.assign({}, prevState.guests);
        guests.adults = addedAdult;
        return { guests };
      })
      this.nightlyPriceCalc();
      this.total();
    }
  }

  addChildren() {
    if ((this.state.guests.adults + this.state.guests.children) < this.state.listing.numberOfGuests) {
      var addedChild = this.state.guests.children + 1;
      this.setState(prevState => {
        let guests = Object.assign({}, prevState.guests);
        guests.children = addedChild;
        return { guests };
      })
      this.nightlyPriceCalc();
      this.total();
    }
  }

  addInfant() {
    if ((this.state.guests.infants) < 5) {
      var addedInfant = this.state.guests.infants + 1;
      this.setState(prevState => {
        let guests = Object.assign({}, prevState.guests);
        guests.infants = addedInfant;
        return { guests };
      })
    }
  }

  subAdult() {
    if (this.state.guests.adults > 1) {
      var subAdult = this.state.guests.adults - 1;
      this.setState(prevState => {
        let guests = Object.assign({}, prevState.guests);
        guests.adults = subAdult;
        return { guests };
      })
      this.nightlyPriceCalc();
      this.total();
    }
  }

  subChildren() {
    if (this.state.guests.children > 0) {
      var subChild = this.state.guests.children - 1;
      this.setState(prevState => {
        let guests = Object.assign({}, prevState.guests);
        guests.children = subChild;
        return { guests };
      })
      this.nightlyPriceCalc();
      this.total();
    }
  }

  subInfant() {
    if (this.state.guests.infants > 0) {
      var subInfant = this.state.guests.infants - 1;
      this.setState(prevState => {
        let guests = Object.assign({}, prevState.guests);
        guests.infants = subInfant;
        return { guests };
      })
    }
  }

  openGuests() {
    this.setState({ guestModal: true });
  }

  closeGuests() {
    this.setState({ guestModal: false});
  }

  openCalendar() {
    this.setState({ calendarModal: true});
  }

  closeCalendar() {
    this.setState({ calendarModal: false});
  }

  nightlyPriceCalc() {
    console.log('nightly price is being called')
    if ((this.state.guests.adults + this.state.guests.children) > this.state.listing.guestsIncluded) {
      let diff = this.state.guests.adults + this.state.guests.children - this.state.listing.guestsIncluded;
      let totalNightPrice = (this.state.listing.nightlyPrice + (diff * this.state.listing.pricePerGuest));
      this.setState({ nightlyPriceWGuests: totalNightPrice }, () => {
        console.log(this.state.nightlyPriceWGuests, 'this.state.nightlyPrice')
      })
    } else {
      this.setState({ nightlyPriceWGuests: this.state.listing.nightlyPrice}, () => {
        console.log(this.state.nightlyPriceWGuests, 'nightly price with guests')
      })
    }
  }

  total() {
    let accomadations = this.state.numberOfNights * this.state.nightlyPriceWGuests;
    let cleaning = this.state.listing.cleaningFee;
    let service = this.state.listing.serviceBase * this.state.numberOfNights;
    let taxes = this.state.numberOfNights * this.state.listing.taxesBase

    let totalAmount = accomadations + cleaning + service + taxes;
    this.setState({ totalPrice: totalAmount }, () => {
      console.log(this.state.totalPrice, 'total price of listing');
    })
  }

  hoverDates() {

  }

  render() {
    return (
      <AppStyle>
          <Ratings listing={this.state.listing}/>
          <CalendarGuests>
            <Calendar listing={this.state.listing}
                      onCheckIn={this.selectCheckIn}
                      onCheckOut={this.selectCheckOut}
                      open={this.openCalendar}
                      checkInDate={this.state.checkIn}
                      checkOutDate={this.state.checkOut}
            />
            <ReactModal isOpen={this.state.calendarModal}
                        onRequestClose={this.closeCalendar}
                        style={CalendarStyles}
            >
              <CalendarModal close={this.closeCalendar}
                            onCheckIn={this.chooseCheckIn}
                            onCheckOut={this.chooseCheckOut}
                            listing={this.state.listing}
                            checkInDate={this.state.checkIn}
                            checkOutDate={this.state.checkOut}
                            clearDates={this.modalClearDates}
                            checkInSelected={this.state.selectedCheckIn}
                            checkOutSelected={this.state.selectedCheckOut}
                            selectCheckIn={this.selectCheckIn}
                            selectCheckOut={this.selectCheckOut}
              />
            </ReactModal>
            <Guests listing={this.state.listing}
                    open={this.openGuests}
                    guests={this.state.guests}
            />
            <ReactModal isOpen={this.state.guestModal}
                        onRequestClose={this.closeGuests}
                        style={GuestStyles}
            >
              <GuestModal close={this.closeGuests}
                          guests={this.state.guests}
                          listing={this.state.listing}
                          addAdult={this.addAdult}
                          addChildren={this.addChildren}
                          addInfant={this.addInfant}
                          subAdult={this.subAdult}
                          subChildren={this.subChildren}
                          subInfant={this.subInfant}
              />
            </ReactModal>
          </CalendarGuests>
          <Reserve listing={this.state.listing}
                   datesSelected={this.state.datesSelected}
                   night={this.state.numberOfNights}
          />
          <Calculation listing={this.state.listing}
                       datesSelected={this.state.datesSelected}
                       night={this.state.numberOfNights}
                       guests={this.state.guests}
                       nightlyPrice={this.state.nightlyPriceWGuests}
                       totalPrice={this.state.totalPrice}
          />
      </AppStyle>
    )
  }
}
//comment to add styling
const AppStyle = styled.div`
  display: flex;
  flex-flow: column wrap;
  width: 375px;
  height: auto;
  padding: 24px;
  color: rgb(34, 34, 34);
  font-size: 16px;
  border: 1px solid rgb(221, 221, 221);
  border-radius: 12px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 16px;
  box-sizing: border-box;
  font-weight: 250;
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif !important;
`;

const CalendarGuests = styled.div`
  padding-bottom: 10px;
  border: 1px solid rgb(221, 221, 221);
  border-radius: 8px;
`;

const GuestStyles = {
  content: {
    color: 'rgb(34, 34, 34)',
    justifyContent: 'flex-start',
    height: '320px',
    width: '280px',
    backgroundColor: 'white',
    outlineColor: 'rgb(72, 72, 72)',
    borderRadius: '4px',
    flexFlow: 'row wrap',
  }
};

const CalendarStyles = {
  content: {
    justifyContent: 'flex-start',
    height: '320px',
    width: '325px',
    backgroundColor: 'white',
    outlineColor: 'rgb(72, 72, 72)',
    borderRadius: '12px',
    flexFlow: 'row wrap'
  }
};

export default App;