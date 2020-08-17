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
    var inDate = moment(checkInDateString, "MMDDYYYY").format('L');
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
    var outDate = moment(checkOutDateString, "MMDDYYYY").format('L');

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
          >
            <CalendarModal close={this.closeCalendar}
                           onCheckIn={this.chooseCheckIn}
                           onCheckOut={this.chooseCheckOut}
                           listing={this.state.listing}
            />
          </ReactModal>
          <Guests listing={this.state.listing}
                  open={this.openGuests}
                  guests={this.state.guests}/>
          <ReactModal isOpen={this.state.guestModal}
                      onRequestClose={this.closeGuests}
          >
            <GuestModal close={this.closeGuests} guests={this.state.guests}/>
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

export default App;