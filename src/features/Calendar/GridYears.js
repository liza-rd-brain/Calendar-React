import React from "react";


function GridYears(props) {
  const startYear = props.startYear;
  const todayYear = props.today.getFullYear();

  let yersList = [];
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
        onClick={() => props.onItemClick(item.number)}
      >
        {item.number}
      </div>
    );
  });

  return <div className="grid">{years}</div>;
}

export default GridYears;
