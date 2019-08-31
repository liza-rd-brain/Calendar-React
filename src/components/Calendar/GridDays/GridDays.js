import React from "react";
import Day from "../Day/Day";
import DayAnotherMonth from "../DayAnotherMonth/DayAnotherMonth";

class GridDays extends React.Component {
  render() {
    const today = this.props.today;
    const currMonth = today.getMonth();
    console.log(currMonth);
    const firstDay = new Date(2019, currMonth, 1);
    //последний день месяца
    const lastDay = new Date(2019, currMonth + 1, 0).getDate();
    console.log(lastDay);
    //массив с днями месяца
    let arrayMonth = [];
    let i = firstDay.getDate();

    while (i < lastDay + 1) {
      arrayMonth.push({ number: i, class: "current" });
      i++;
    }

    /*    //день недели сегодня
    const currDayOfWeek = today.getDay();
    console.log(`День недели: ${currDayOfWeek}`); */

    //день недели первого дня
    const firstDayOfWeek = firstDay.getDay();
    console.log(`День недели: ${firstDayOfWeek}`);

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
        console.log("тут");
        break;
    }
    console.log(`Добавить дней :${amountPrevMohthDays}`);
    //теперь нужно отсчитать  currDayOfWeek дней от конца месяца предыдущего

    const lastDayPreMonth = new Date(2019, currMonth, 0).getDate();
    console.log(`Последний день предыдущего месяца:${lastDayPreMonth}`);
    
    //первый день в строке от последнего месяца
    let j = lastDayPreMonth - amountPrevMohthDays + 1;
    //получили массив от предыдущих дней
    let arrayDaysPrevMonth = [];
    while (j < lastDayPreMonth + 1) {
      arrayDaysPrevMonth.push({ number: j, class: "another" });
      j++;
    }
    console.log(arrayDaysPrevMonth);

    let arrayPrevAndCurrent = arrayDaysPrevMonth.concat(arrayMonth);
    console.log(arrayPrevAndCurrent);

    let amountNextMohthDays = 42 - arrayPrevAndCurrent.length;
    console.log(`Оставшиеся дни:${amountNextMohthDays}`);
    const firstDayPreMonth = new Date(2019, currMonth + 1, 1);
    console.log(firstDayPreMonth);

    let arrayDaysNextMonth = [];
    let k = 1;
    while (k < amountNextMohthDays + 1) {
      arrayDaysNextMonth.push({ number: k, class: "another" });
      k++;
    }

    console.log(arrayDaysNextMonth);
    let arrayAllMonth = arrayPrevAndCurrent.concat(arrayDaysNextMonth);
    console.log(arrayAllMonth);


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
