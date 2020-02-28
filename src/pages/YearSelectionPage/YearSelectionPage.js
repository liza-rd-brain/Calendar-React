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
import TaskList from "../../components/TaskList/TaskList";
import YearSelection from "../../components/YearSelection";
/* import MonthSelection from "../../components/MonthSelection"; */
/* import NewTask from "../../components/TaskList/NewTask/NewTask"; */
/* import "./../style.css"; */

class YearSelectionPage extends React.Component {
  render() {
    return (
      <>
        <Route path="/">
          <YearSelection
            today={this.props.today}
            month={this.props.month}
            year={this.props.year}
            onChangeSelectDay={this.props.onChangeSelectDay}
            onChangeMonth={this.props.onChangeMonth}
            onChangeYear={this.props.onChangeYear}
            onChangeDate={this.props.handleChangeDate}
            onChangeStartYear={this.props.onChangeStartYear}
            onIncStartYear={this.props.onIncStartYear}
            onDecStartYear={this.props.onDecStartYear}
            startYear={this.props.startYear}
            endYear={this.props.endYear}
            onChangeRoute={this.props.onRouteToMonth}
          />
        </Route>
      </>
    );
  }
}

export default YearSelectionPage;
