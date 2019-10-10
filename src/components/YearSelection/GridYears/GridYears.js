import React from "react";
import { Link } from "react-router-dom";

export default class GridYears extends React.Component {
  render() {
    const startYear = this.props.startYear;
    console.log(startYear);
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

    console.log(yersList);

    const years = yersList.map((item, i) => {
      return (
        <div
          key={`${item.number}-${i}}`}
          /* id={item.number} */
          className={item.class}
          onClick={() => this.props.onClick(item.number)}
        >
          {item.number}
        </div>
      );
    });

    return (
      <Link className="link" to="/monthSelection">
        <div className="grid">{years}</div>
      </Link>
    );
  }
}
