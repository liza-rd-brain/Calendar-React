import React from "react";
import Day from "../Day/Day";

class GridDays extends React.Component {
  render() {
    const today = this.props.today.getDate();
    const currMonth = this.props.today.getMonth();
    console.log(currMonth);
    const firstDay = 1;
    //последний день месяца
    const lastDay = new Date(2019, currMonth + 1, 0).getDate();
    console.log(lastDay);
    //массив с днями месяца
    let arrayMonth = [];
    let i = firstDay;
    while (i < lastDay) {
      arrayMonth.push(i);
      i++;
    }
    const arrayGrid = arrayMonth.map(item => {
      return <Day key={item} item={item} className="test" />;
    });

    //логика:пока первый день недели-понедельник=>
    //выясняем какой первый из дней-понедельник!

    console.log(arrayMonth);
    //должны вырнуть сетку дней, которая будет начинаться с параметризируемого дня
    //выясняем какой сегодня день
    //выясняем сколько дней в месяце или какой последний день...
    //нарисовали сетку=>
    //1) выставляем минимум 6 недель
    //выясняем какой день недели первый,
    //не понедельник=> перед ним будем рисовать добавочные дни c понедельника до этого дня
    //2) выясняем количество дней, которое получилось: 5*6-тек.к.дней = дни, сколько нужно еще дорисовать

    return <div className="gridDays">{arrayGrid}</div>;
  }
}

export default GridDays;
