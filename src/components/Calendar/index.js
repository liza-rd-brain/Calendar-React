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

    this.handleToCalendar = this.handleToCalendar.bind(this);
    this.handleToMonthSelection = this.handleToMonthSelection.bind(this);
    this.handleToYearSelection = this.handleToYearSelection.bind(this);
  }

  handleToCalendar() {
    this.props.history.push("/");
  }

  handleToMonthSelection() {
    this.props.history.push("/monthSelection");
  }

  handleToYearSelection() {
    this.props.history.push("/yearSelection");
  }

  render() {
    return (
      <>
        <Route exact path="/" component={DaySelection}>
          <>
            <DaySelection
              today={this.props.today}
              month={this.props.month}
              year={this.props.year}
              onChangeSelectDay={this.props.onChangeSelectDay}
              onChangeMonth={this.props.onChangeMonth}
              onChangeYear={this.props.onChangeYear}
              onChangeStartYear={this.props.onChangeStartYear}
              onTitleClick={this.handleToMonthSelection}
            />
          </>
        </Route>
        <Route path="/monthSelection" component={MonthSelection}>
          <MonthSelection
            today={this.props.today}
            month={this.props.month}
            year={this.props.year}
            startYear={this.props.startYear}
            onChangeMonth={this.props.onChangeMonth}
            onChangeYear={this.props.onChangeYear}
            onChangeStartYear={this.props.onChangeStartYear}
            onTitleClick={this.handleToYearSelection}
            onChangeRoute={this.handleToCalendar}
          />
        </Route>
        <Route path="/yearSelection" component={YearSelection}>
          <YearSelection
            today={this.props.today}
            month={this.props.month}
            year={this.props.year}
            startYear={this.props.startYear}
            endYear={this.props.endYear}
            onChangeMonth={this.props.onChangeMonth}
            onChangeYear={this.props.onChangeYear}
            /*  onChangeStartYear={this.props.onChangeStartYear} */
            onIncStartYear={this.props.onIncStartYear}
            onDecStartYear={this.props.onDecStartYear}
            onChangeRoute={this.handleToMonthSelection}
          ></YearSelection>
        </Route>
      </>
    );
  }
}

export default withRouter(Calendar);
