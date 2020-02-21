import React from "react";

import moment from "moment";
moment.locale("ru");

export default class Title extends React.Component {
  render() {
    let currentMonthName = 0;
    if (this.props.month) {
      const monthName = moment(this.props.month).format("MMMM");
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
