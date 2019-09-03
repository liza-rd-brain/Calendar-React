import React from "react";

class NameDays extends React.Component {
  render() {
    const week = ["пн", "вт", "ср", "чт", "пт", "сбб", "вск"];

    const day = week.map(item => {
      return (
        <div key={item} className="nameDays">
          {item}
        </div>
      );
    });

    return <div className="nameDays">{day}</div>;
  }
}

export default NameDays;
