import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datesSelected: [],
      listing: []
    }
  }

  getListing() {
    axios.get('/listing/:id')
      .then((listingData) => {
        this.setState({
          listing: listingData
        })
      })
  }

  reserve() {
    axios.put('/listing/:id')
      .then(() => {
        console.log('Reserved')
      })
  }

  chooseDates() {

  }

  componentDidMount() {
    this.getListing();
  }

  render() {
    return (
      <div>
        <Calendar listing={this.state.listing} chooseDates={this.chooseDates.bind(this)} />
        <Guests listing={this.state.listing}/>
        <Calculation listing={this.state.listing} datesSelected={this.state.datesSelected}/>
        <Reserve listing={this.state.listing} onSubmit={this.reserve.bind(this)} datesSelected={this.state.datesSelected}/>
      </div>
    )
  }
}

export default App;