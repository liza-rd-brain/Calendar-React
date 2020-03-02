import React from "react";

class DateTimeInput extends React.Component {
  render() {
    return (
      <div className="dateTimeBlock">
        <p>{this.props.title}</p>
        <div className="dateTimeInput">
          <input
            /*   required */
            type="date"
            name={this.props.dateValue}
            className="dateInput"
            onChange={this.props.onChange}
            /*  value={this.props.date || undefined} */
          />
          <input
            /* required */
            type="time"
            name={this.props.timeValue}
            className="timeInput"
            onChange={this.props.onChange}
            /* value={this.props.time || undefined} */
          />
          {/*   <input type="datetime-local" /> */}
        </div>
      </div>
    );
  }
}

export default DateTimeInput;
