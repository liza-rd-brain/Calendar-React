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

class MonthSelectionPage extends React.Component {
  render() {
    return (
      <>
        <Route path="/">
          <Timer today={this.props.today} time={this.props.time}></Timer>
          <MonthSelection
            today={this.props.today}
            month={this.props.month}
            year={this.props.year}
            onChangeSelectDay={this.props.onChangeSelectDay}
            onChangeMonth={this.props.onChangeMonth}
            onChangeYear={this.props.onChangeYear}
            onChangeDate={this.props.handleChangeDate}
            onChangeStartYear={this.props.onChangeStartYear}
            onIncStartYear={this.props.onIncStartYear}
            onDecStartYear={this.props.handleDecStartYear}
            startYear={this.props.startYear}
            endYear={this.props.endYear}
            onChangeRoute={this.props.onRouteToCalendar}
            onTitleClick={this.props.onRouteToYearh}
          />

          <TaskList
            today={this.props.today}
            month={this.props.month}
            year={this.props.year}
            selectDay={this.props.selectDay}
            hrefNewTask={this.props.hrefNewTask}
            taskList={this.props.taskList}
          />
        </Route>
      </>
    );
  }
}

/* const MainWithRouter = withRouter(Main); */
/* export default MainWithRouter; */

export default MonthSelectionPage;
