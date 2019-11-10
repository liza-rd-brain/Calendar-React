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
/* import TaskList from "../TaskList/TaskList"; */

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      today: new Date(),
      month: new Date().getMonth(),
      year: new Date().getFullYear()
    };
    //  не влияет на отрисовку state
    this.startYear = 2010;
    this.endYear = this.startYear + 15;
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleToCalendar = this.handleToCalendar.bind(this);
    this.handleToMonthSelection = this.handleToMonthSelection.bind(this);
    this.handleToYearSelection = this.handleToYearSelection.bind(this);
    this.updateSystemDate = this.updateSystemDate.bind(this);
    this.update = setInterval(this.updateSystemDate, 1000);
  }

  handleChangeDate(month, year, startYear) {
    this.setState({
      month: month,
      year: year
    });
    this.startYear = startYear || this.startYear;
  }

  updateSystemDate() {
    const numberDayTomorrow = new Date().getDate();
    const numberDayToday = this.state.today.getDate();
    if (numberDayTomorrow !== numberDayToday) {
      this.setState({ today: new Date() });
    }
  }

  handleToCalendar() {
    this.props.history.push("/");
  }
  handleToMonthSelection() {
    console.log("click");
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
              today={this.state.today}
              month={this.state.month}
              year={this.state.year}
              onChangeDate={this.handleChangeDate}
              onTitleClick={this.handleToMonthSelection}
            />
          </>
        </Route>
        <Route path="/monthSelection" component={MonthSelection}>
          <MonthSelection
            today={this.state.today}
            month={this.state.month}
            year={this.state.year}
            startYear={this.startYear}
            onChangeDate={this.handleChangeDate}
            onTitleClick={this.handleToYearSelection}
            onChangeRoute={this.handleToCalendar}
          />
        </Route>
        <Route path="/yearSelection" component={YearSelection}>
          <YearSelection
            today={this.state.today}
            month={this.state.month}
            year={this.state.year}
            startYear={this.startYear}
            onChangeDate={this.handleChangeDate}
            onChangeRoute={this.handleToMonthSelection}
          ></YearSelection>
        </Route>
      </>
    );
  }
}

export default withRouter(Calendar);
/* const ShowTheLocation = withRouter(App); */
