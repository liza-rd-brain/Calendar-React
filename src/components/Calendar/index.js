import React from "react";
/* import ReactDOM from "react-dom"; */
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  withRouter
} from "react-router-dom";
import DaySelection from "../DaySelection";
import MonthSelection from "../MonthSelection";
import YearSelection from "../YearSelection";

class Calendar extends React.Component {
  constructor(props) {
    super(props);

  }


  render() {
    return (
      <>
        {/* <Switch> */}
          <Route exact path="/">
            <DaySelection
              today={this.props.today}
              month={this.props.month}
              year={this.props.year}
              onChangeSelectDay={this.props.onChangeSelectDay}
              onChangeMonth={this.props.onChangeMonth}
              onChangeYear={this.props.onChangeYear}
              onChangeStartYear={this.props.onChangeStartYear}
              onTitleClick={this.props.onRouteToMonth}
            />
          </Route>

          <Route exact path="/monthSelection">
            <MonthSelection
              today={this.props.today}
              month={this.props.month}
              year={this.props.year}
              startYear={this.props.startYear}
              onChangeMonth={this.props.onChangeMonth}
              onChangeYear={this.props.onChangeYear}
              onChangeStartYear={this.props.onChangeStartYear}
              onTitleClick={this.props.onRouteToYearh}
              onChangeRoute={this.props.onRouteToCalendar}
            />
          </Route>
          <Route exact path="/yearSelection">
            <YearSelection
              today={this.props.today}
              month={this.props.month}
              year={this.props.year}
              startYear={this.props.startYear}
              endYear={this.props.endYear}
              onChangeMonth={this.props.onChangeMonth}
              onChangeYear={this.props.onChangeYear}
              onIncStartYear={this.props.onIncStartYear}
              onDecStartYear={this.props.onDecStartYear}
              onChangeRoute={this.props.onRouteToMonth}
            ></YearSelection>
          </Route>
        {/* </Switch> */}
      </>
    );
  }
}

export default withRouter(Calendar);
