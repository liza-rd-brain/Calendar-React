import React from "react";
import Day from "../Day/Day";
import DayAnotherMonth from "../DayAnotherMonth/DayAnotherMonth";

class GridDays extends React.Component {
  //построение сетки дней зависит от того,какой пришел месяц
  // сегодняшний день только для добавления класса-?!
  render() {
    // пока забью на сегодняшний день
    const todayDay = this.props.today.getDate();
    const todayMonth = this.props.today.getMonth();
    const todayYear = this.props.today.getFullYear();

    const currYear = this.props.year;
    const currMonth = this.props.month;

    const firstDay = new Date(2019, currMonth, 1);
    //последний день месяца
    const lastDay = new Date(2019, currMonth + 1, 0).getDate();

    //массив с днями месяца
    let arrayMonth = [];
    let i = firstDay.getDate();

    while (i < lastDay + 1) {
      let className = "current";
      debugger;
      todayDay === i && todayMonth === currMonth && todayYear === currYear
        ? (className += " today")
        : "";
      console.log(className);
      arrayMonth.push({ number: i, class: className });
      i++;
    }

    //день недели первого дня
    const firstDayOfWeek = firstDay.getDay();

    let amountPrevMohthDays;
    switch (firstDayOfWeek) {
      case 1:
        break;
      case 0:
        amountPrevMohthDays = 6;
        //добавим 6 элементов до!
        break;
      default:
        amountPrevMohthDays = firstDayOfWeek - 1;
        break;
    }

    //теперь нужно отсчитать  currDayOfWeek дней от конца месяца предыдущего

    const lastDayPreMonth = new Date(2019, currMonth, 0).getDate();
    //первый день в строке от последнего месяца
    let j = lastDayPreMonth - amountPrevMohthDays + 1;
    //получили массив от предыдущих дней
    let arrayDaysPrevMonth = [];
    while (j < lastDayPreMonth + 1) {
      arrayDaysPrevMonth.push({ number: j, class: "another" });
      j++;
    }

    let arrayPrevAndCurrent = arrayDaysPrevMonth.concat(arrayMonth);

    let amountNextMohthDays = 42 - arrayPrevAndCurrent.length;

    let arrayDaysNextMonth = [];
    let k = 1;
    while (k < amountNextMohthDays + 1) {
      arrayDaysNextMonth.push({ number: k, class: "another" });
      k++;
    }

    let arrayAllMonth = arrayPrevAndCurrent.concat(arrayDaysNextMonth);

    //ИТОГОВАЯ СЕТКА
    const arrayGrid = arrayAllMonth.map(item => {
      return (
        <Day
          key={item.number + item.class}
          item={item.number}
          class={item.class}
        />
      );
    });

    return <div className="gridDays">{arrayGrid}</div>;
  }
}

export default GridDays;
