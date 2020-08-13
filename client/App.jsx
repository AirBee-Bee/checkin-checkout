import React from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import moment from 'moment';
import styled from 'styled-components';

import Calendar from './components/Calendar.jsx';
import Calculation from './components/Calculation.jsx';
import Guests from './components/Guests.jsx';
import Reserve from './components/Reserve.jsx';
import Ratings from './components/Ratings.jsx';
import CheckIn from './components/CheckIn.jsx';
import CheckOut from './components/CheckOut.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datesSelected: [],
      checkIn: null,
      checkOut: null,
      listing: [],
      today: null
    }
  }

  getListing(listingId) {
    axios.get(`/listing/${listingId}`)
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
      checkIn: inDate
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
      checkOut: outDate
    })
    if(this.state.checkIn > this.state.checkOut && this.state.checkOut !== null && this.state.checkIn !== null) {
      alert('choose a valid checkin time');
      this.setState({
        checkIn: null,
        checkOut: null
      })
    } else {
      this.chooseDates();
    }

    console.log('this.state.checkout', this.state.checkOut);
  }

  chooseDates() {
    if (this.state.checkOut !== null && this.state.checkIn !== null) {
      var result = [];
      // var daysTotal = this.stateCheckout.diff(this.state.checkIn, 'days');
      // console.log(daysTotal, 'days total');




      // while (testDate <= this.stateCheckout) {
      //   result.push(testDate);
      //   console.log('testDate', testDate)
      //   testDate.setDate(testDate.getDate() + 1);
      // }
      // console.log('result', result);
    }
  }

  todaysDate() {
    var date = moment().format('L');
    console.log('date', date);
    this.setState({
      today: date
    })
  }

  componentDidMount() {
    var id = 9;
    this.getListing(id);
    this.todaysDate();
    console.log('should be todays date', this.state.today)
  }

  // componentDidUpdate() {
  //   this.chooseCheckIn();
  //   this.chooseCheckOut();
  // }

  render() {
    const AppStyle = styled.div`
      width: 30%;
      height: 10%;
      padding: 24px;
      color: rgb(34, 34, 34);
      display: block
      font-size: 16px
      border: 1px solid rgb(221, 221, 221);
      border-radius: 12px;
      box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 16px;
      box-sizing: border-box;
    `;
    return (
      <AppStyle>
        <Router>
          <div className="allComponents">
            <Route path="/listing/">
              <Ratings listing={this.state.listing}/>
              <Calendar listing={this.state.listing} onCheckIn={this.chooseCheckIn.bind(this)} onCheckOut={this.chooseCheckOut.bind(this)}/>
              <Guests listing={this.state.listing}/>
              <Calculation listing={this.state.listing} datesSelected={this.state.datesSelected}/>
              <Reserve listing={this.state.listing} onSubmit={this.reserve.bind(this)} datesSelected={this.state.datesSelected}/>
            </Route>
          </div>
        </Router>
      </AppStyle>
    )
  }
}

export default App;