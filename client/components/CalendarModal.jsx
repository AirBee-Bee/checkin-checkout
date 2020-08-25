import React from 'react';
import moment from 'moment';
import styled from 'styled-components';

import CheckIn from './CheckIn.jsx';
import CheckOut from './CheckOut.jsx';

class CalendarModal extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      moment: moment(),
      allmonths: moment.months(),
      weekdayshort: moment.weekdaysShort(),
    };
  }

  firstDayOfMonth() {
    let date = this.state.moment;
    let firstDay = moment(date).startOf("month").format("d");
    return firstDay;
  }

  year() {
    return this.state.moment.format("Y");
  }

  today() {
    return this.state.moment.format("D");
  }

  daysInMonth() {
    return this.state.moment.daysInMonth();
  }

  month() {
    return this.state.moment.format("MMMM");
  }

  monthNum() {
    return this.state.moment.format("MM");
  }

  previousMonth() {
    this.setState({
      moment: this.state.moment.subtract(1, "month"),
    })
  }

  nextMonth() {
    this.setState({
      moment: this.state.moment.add(1, "month"),
    })
    console.log
  }

  setHover(e) {
    e.target.style.background = 'black';
    e.target.style.color = 'white';
  }

  resetHover(e) {
    e.target.style.removeProperty('background');
    e.target.style.removeProperty('color');
  }

  render() {
    let weekdayshortname = this.state.weekdayshort.map(day => {
      return <th key={day}>{day}</th>
    });

    let blanks = [];
    for (var i = 0; i < this.firstDayOfMonth(); i++) {
      blanks.push(<td className="calender-day empty">{""}</td>)
    }

    let daysInMonth = [];
    for (let d = 1; d <= this.daysInMonth(); d++) {
      let today = d == this.today() ? "today" : "";

      daysInMonth.push(
        <td key={d} className={`calendar-day ${today}`}>
          <span
            onClick={e => {
              if(this.props.checkInSelected) {
                let months = this.monthNum();
                let years = this.year();
                let dayString = months.toString() + d.toString() + years.toString();
                this.props.onCheckIn(dayString);
                //this.props.selectCheckOut();
                console.log(dayString, months, d, years, 'dayString M D Y')

              } else if (this.props.checkOutSelected) {
                let months = this.monthNum();
                let years = this.year();
                let dayString = months.toString() + d.toString() + years.toString();
                this.props.onCheckOut(dayString)
                console.log(dayString, months, d, years, 'dayString M D Y')
                //this.props.selectCheckIn();
              }
            }}
            onMouseEnter={this.setHover}
            onMouseLeave={this.resetHover}
          >
            {d}
          </span>
        </td>
      );
    }


    var totalSpaces = [...blanks, ...daysInMonth];
    let rows = [];
    let cells = [];

    totalSpaces.forEach((row, i) => {
      if (i % 7 !== 0) {
        cells.push(row);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }
      if (i === totalSpaces.length - 1) {
        // let insertRow = cells.slice();
        rows.push(cells);
      }
    });

    let daysinmonth = rows.map((d, i) => {
      return <tr>{d}</tr>;
    });

    return (
      <React.Fragment>
        <CalendarStyle>
          <div className="modal-header">
            <div className="select-dates">
              Select dates
            </div>
            <div className="minimum-nights">
              Minimum Stay: {this.props.listing.minNights} nights
            </div>
            <CheckInOutStyle>
              <CheckIn onSelect={this.props.selectCheckIn} checkInDate={this.props.checkInDate}/>
              <CheckOut onSelect={this.props.selectCheckOut} checkOutDate={this.props.checkOutDate}/>
            </CheckInOutStyle>
          </div>
          <div className="calendar">
            <div className="calendar-navigation">
              <ChangeMonthStyle>
                <div onClick={e => {
                      this.previousMonth();
                    }}
                    className="calendar-button button-prev">
                -</div>
                <div className="month-one">
                  <div className="month">{this.month()}</div>
                  <div className="year">{this.year()}</div>
                  </div>
                <div onClick={e => {
                  this.nextMonth();
                  }}
                  className="calendar-button button-next">
                +</div>
              </ChangeMonthStyle>
            </div>
            <CalendarDatesStyle>
              <table className="calendar-day">
                <thead>
                  <tr>{weekdayshortname}</tr>
                </thead>
                <tbody>{daysinmonth}</tbody>
              </table>
            </CalendarDatesStyle>
            <ButtonStyle>
              <button onClick={this.props.clearDates}>Clear Dates</button>
              <button onClick={this.props.close}>Close</button>
            </ButtonStyle>
          </div>
        </CalendarStyle>
      </React.Fragment>
    )
  }
}

const CalendarStyle = styled.div`
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif !important;
`;

const CalendarDatesStyle = styled.div`
  display: flex;
  justify-content: center
`;

const CheckInOutStyle = styled.div`
  display: flex;
  justify-content: flex-start;
  width: auto;
`;

const ChangeMonthStyle = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const ButtonStyle = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export default CalendarModal;