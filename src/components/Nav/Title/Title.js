import React from "react";

import moment from "moment";
moment.locale("ru");

export default class Title extends React.Component {
  render() {
    let currentMonthName = 0;
    /* debugger; */
    if (this.props.month || this.props.month === 0) {
      const date = new Date(this.props.year, this.props.month);
      const monthName = moment(date).format("MMMM");
      currentMonthName = monthName[0].toUpperCase() + monthName.slice(1);
    }

    return (
      <div
        className="title"
        onClick={this.props.onTitleClick}
      >{`${currentMonthName || ""} ${this.props.year} `}</div>
    );
  }
}
