import React from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import moment from 'moment';

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
      checkIn: '',
      checkOut: '',
      listing: [],
      today: '',
    }
  }

  getListing(listingId) {
    axios.get(`/listing/${listingId}`)
      .then((listingData) => {
        console.log('listingData', listingData.data)
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
    this.setState({
      checkIn: document.getElementById('check-in').value
    })
    this.chooseCheckOut();

    console.log('this.state.checkIn', this.state.checkIn);
  }

  chooseCheckOut() {
    this.setState({
      checkOut: document.getElementById('check-out').value
    })
    if(this.state.checkIn > this.state.checkOut && this.state.checkOut !== null && this.state.checkIn !== null) {
      alert('choose a valid checkin time');
      this.setState({
        checkIn: '',
        checkOut: ''
      })
    } else {
      this.chooseDates();
    }

    console.log('this.state.checkout', this.state.checkOut);
  }

  chooseDates() {
    if (this.state.checkOut && this.state.checkIn) {
      var result = [];
      var testDate = this.state.checkIn + 1;
      console.log(testDate);


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
    });

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
    return (
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
    )
  }
}

export default App;