import React from "react";

function GridMonth(props) {
  const currDate = props.date || props.today;
  const todayYear = currDate.getFullYear();
  const todayMonth = currDate.getMonth();
  const currYear = props.today.getFullYear();

  const monthsList = [
    "янв",
    "фев",
    "мар",
    "апр",
    "май",
    "июн",
    "июл",
    "авг",
    "сен",
    "окт",
    "ноя",
    "дек"
  ];

  const months = monthsList.map((name, i) => {
    let nameMonth = "nameMonth";
    todayMonth === i && todayYear === currYear
      ? (nameMonth += " currMonth")
      : "";
    return (
      <div
        key={name}
        id={name}
        className={nameMonth}
        onClick={() => props.onItemClick(i)}
      >
        {name}
      </div>
    );
  });

  return <div className="grid">{months}</div>;
}

export default GridMonth;
