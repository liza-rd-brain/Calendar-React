import React from "react";

import moment from "moment";
moment.locale("ru");

export default class Title extends React.Component {
  render() {
    const monthName = moment(this.props.month).format("MMMM");
    const currentMonthName = monthName[0].toUpperCase() + monthName.slice(1);

    return (
      <div
        className="title"
        onClick={this.props.onTitleClick}
      >{`${currentMonthName || ""} ${this.props.year} `}</div>
    );
  }
}
