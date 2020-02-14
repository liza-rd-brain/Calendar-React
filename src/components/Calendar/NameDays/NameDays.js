import React from "react";

export default class NameDays extends React.Component {
  render() {
    const week = ["пн", "вт", "ср", "чт", "пт", "сбб", "вск"];

    const day = week.map(name => {
      return (
        <div key={name} className="nameDay">
          {name}
        </div>
      );
    });

    return <div className="nameDaysList">{day}</div>;
  }
}
