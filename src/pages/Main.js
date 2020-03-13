import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  withRouter
} from "react-router-dom";

import Timer from "../features/Timer";

import Calendar from "../features/Calendar";

class Main extends React.Component {
  render() {
    return (
      <>
        <Route path="/">
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
            onDecStartYear={this.props.onDecStartYear}
            startYear={this.props.startYear}
            endYear={this.props.endYear}
            onRouteToCalendar={this.props.handleToCalendar}
            onTitleClick={this.props.onRouteToMonth}
            onRouteToYearh={this.props.onRouteToYearh}
          />
        </Route>
      </>
    );
  }
}

export default Main;
