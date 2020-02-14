import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  withRouter
} from "react-router-dom";

import Timer from "../../components/Timer";

import Calendar from "../../components/Calendar";
import MonthSelection from "../../components/MonthSelection";
import TaskList from "../../components/TaskList/TaskList";
/* import YearSelection from "../../components/YearSelection"; */
/* import NewTask from "../../components/TaskList/NewTask/NewTask"; */
/* import "./../style.css"; */

class Main extends React.Component {
  render() {
    return (
      <>
        <Route path="/">
          <Timer></Timer>
          <Calendar
            today={this.props.today}
            month={this.props.month}
            year={this.props.year}
            onChangeSelectDay={this.props.onChangeSelectDay}
            onChangeMonth={this.props.onChangeMonth}
            onChangeYear={this.props.onChangeYear}
            /*       onChangeDate={this.props.handleChangeDate} */
            onChangeStartYear={this.props.onChangeStartYear}
            onIncStartYear={this.props.onIncStartYear}
            onDecStartYear={this.props.handleDecStartYear}
            startYear={this.props.startYear}
            onDecStartYear
            endYear={this.props.endYear}
            onRouteToCalendar={this.props.handleToCalendar}
            onTitleClick={this.props.onRouteToMonth}
            onRouteToYearh={this.props.onRouteToYearh}
          />
          {/*  <Route path="/"> */}
          <TaskList
            today={this.props.today}
            month={this.props.month}
            year={this.props.year}
            selectDay={this.props.selectDay}
            onClickNewTask={this.props.onClickNewTask}
          />
          {/*  </Route> */}
          {/*   <Route path="/newTask" component={NewTask}></Route> */}
        </Route>
      </>
    );
  }
}

/* const MainWithRouter = withRouter(Main); */
/* export default MainWithRouter; */

export default Main;
