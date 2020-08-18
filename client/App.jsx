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
      checkIn: null,
      checkOut: null,
      listing: [],
      today: null,
      guestModal: false,
      calendarModal: false,
      guests: {
        adults: 1,
        children: 0,
        infants: 0
      }
    }
    this.getListing = this.getListing.bind(this);
    this.openGuests = this.openGuests.bind(this);
    this.closeGuests = this.closeGuests.bind(this);
    this.openCalendar = this.openCalendar.bind(this);
    this.closeCalendar = this.closeCalendar.bind(this);
    this.chooseCheckIn = this.chooseCheckIn.bind(this);
    this.chooseCheckOut = this.chooseCheckOut.bind(this);
    this.addAdult = this.addAdult.bind(this);
    this.addChildren = this.addChildren.bind(this);
    this.addInfant = this.addInfant.bind(this);
    this.subAdult = this.subAdult.bind(this);
    this.subChildren = this.subChildren.bind(this);
    this.subInfant = this.subInfant.bind(this);
  }

  componentDidMount() {
    this.getListing();
    this.todaysDate();
    console.log('should be todays date', this.state.today)
  }

  getListing() {
    var id = window.location.href.split('/');
    axios.get(`/listing/${id[4]}/rooms`)
      .then((listingData) => {

        this.setState({
          listing: listingData.data[0]
        })
      })
  }

  reserve() {
    axios.put('/listing/:id')
      .then(() => {
        console.log('Reserved')
      })
  }

  chooseCheckIn() {
    var checkInDate = document.getElementById('check-in').value
    checkInDate = checkInDate.split('-');
    var checkInDateString = checkInDate[1] + checkInDate[2] + checkInDate[0];
    // var inDate = moment(checkInDateString, "MMDDYYYY").format('L');
    this.setState({
      checkIn: document.getElementById('check-in').value
    })

    console.log(this.state.checkIn, 'this.state.checkIn');
    this.chooseCheckOut();
  }

  chooseCheckOut() {
    var checkOutDate = document.getElementById('check-out').value
    checkOutDate = checkOutDate.split('-');
    var checkOutDateString = checkOutDate[1] + checkOutDate[2] + checkOutDate[0];
    // var outDate = moment(checkOutDateString, "MMDDYYYY").format('L');

    this.setState({
      checkOut: document.getElementById('check-out').value
    })
    if(this.state.checkIn > this.state.checkOut && this.state.checkOut !== null && this.state.checkIn !== null) {
      alert('choose a valid checkin time');
      this.setState({
        checkIn: null,
        checkOut: null
      })
    } else {

    }

    console.log('this.state.checkout', this.state.checkOut);
  }

  // chooseDates() {
  //   if (this.state.checkOut !== null && this.state.checkIn !== null) {
  //     var result = [];
  //     // var daysTotal = this.stateCheckout.diff(this.state.checkIn, 'days');
  //     // console.log(daysTotal, 'days total');




  //     // while (testDate <= this.stateCheckout) {
  //     //   result.push(testDate);
  //     //   console.log('testDate', testDate)
  //     //   testDate.setDate(testDate.getDate() + 1);
  //     // }
  //     // console.log('result', result);
  //   }
  // }

  todaysDate() {
    var date = moment().format('L');
    console.log('date', date);
    this.setState({
      today: date
    })
  }

  addAdult() {
    if ((this.state.guests.adults + this.state.guests.children) < this.state.listing.numberOfGuests) {
      var addedAdult = this.state.guests.adults + 1;
      this.setState(prevState => {
        let guests = Object.assign({}, prevState.guests);
        guests.adults = addedAdult;
        return { guests };
      })
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
    this.setState({ guestModal: true});
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

  render() {
    return (
      <AppStyle>
        <div className="allComponents">
          <Ratings listing={this.state.listing}/>
          <Calendar listing={this.state.listing}
                    onCheckIn={this.chooseCheckIn}
                    onCheckOut={this.chooseCheckOut}
                    open={this.openCalendar}
          />
          <ReactModal isOpen={this.state.calendarModal}
                      onRequestClose={this.closeCalendar}
                      style={CalendarStyles}
          >
            <CalendarModal close={this.closeCalendar}
                           onCheckIn={this.chooseCheckIn}
                           onCheckOut={this.chooseCheckOut}
                           listing={this.state.listing}
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
          <Calculation listing={this.state.listing}
                       datesSelected={this.state.datesSelected}
          />
          <Reserve listing={this.state.listing}
                   datesSelected={this.state.datesSelected}
          />
        </div>
      </AppStyle>
    )
  }
}

const AppStyle = styled.div`
      width: 30%;
      height: 10%;
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

const GuestStyles = {
  content: {
    display: 'block',
    color: 'rgb(34, 34, 34)',
    justifyContent: 'flex-start',
    position: 'absolute',
    height: '320px',
    width: '280px',
    backgroundColor: 'white',
    outlineColor: 'rgb(72, 72, 72)',
    borderRadius: '4px',
    flexFlow: 'row wrap',
  }
};

const CalendarStyles = {
  overlay: {
    top: '0px',
    left: '0px',
    right: '0px',
    bottom: '0px',
    height: '100%',
    width: '100%',
  },
  content: {
    justifyContent: 'flex-start',
    top: '40px',
    left: '40px',
    right: '40px',
    bottom: '40px',
    height: 'auto',
    width: 'auto',
    padding: '24px 24px 24px 24px',
    transform: '(-50%, -50%)',
    backgroundColor: 'white',
    outlineColor: 'rgb(72, 72, 72)',
    borderRadius: '12px',
    maxWidth: '1000px',
    flexFlow: 'row wrap'
  }
};

export default App;