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


class MonthSelectionPage extends React.Component {
  render() {
    return (
      <>
        <Route path="/">
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
        </Route>
      </>
    );
  }
}


export default MonthSelectionPage;
