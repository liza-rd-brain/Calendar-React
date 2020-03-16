import React from "react";
import { Link } from "react-router-dom";

export default class GridYears extends React.Component {
  render() {
    const startYear = this.props.startYear;
    const todayYear = this.props.today.getFullYear();
    const currYear = this.props.year;
    const currMonth = this.props.month;

    const yersList = [];
    const lenghtYersList = 16;
    let yearStart = startYear;
    for (let counter = 0; counter < lenghtYersList; counter++) {
      let className = "numberYear";
      todayYear === yearStart ? (className += " currYear") : "";
      yersList.push({ number: yearStart, class: className });
      yearStart++;
    }

    const years = yersList.map((item, i) => {
      return (
        <div
          key={`${item.number}-${i}}`}
          className={item.class}
          onClick={() => this.props.onItemClick(item.number)}
        >
          {item.number}
        </div>
      );
    });

    return <div className="grid">{years}</div>;
  }
}
