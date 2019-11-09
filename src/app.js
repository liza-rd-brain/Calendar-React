import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  withRouter
} from "react-router-dom";
import Calendar from "./components/Calendar";
import MonthSelection from "./components/MonthSelection";
import YearSelection from "./components/YearSelection";

import "./style.css";

const App = withRouter(
  class _App extends React.Component {
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
      this.handleCalendarClick = this.handleCalendarClick.bind(this);
      this.handleMonthSelectionClick = this.handleMonthSelectionClick.bind(
        this
      );
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
    handleCalendarClick() {
      console.log("click");
      this.props.history.push("/monthSelection");
    }
    handleMonthSelectionClick() {
      this.props.history.push("/yearSelection");
    }

    render() {
      return (
        <>
          <Route exact path="/" component={Calendar}>
            <Calendar
              today={this.state.today}
              month={this.state.month}
              year={this.state.year}
              onchangeDate={this.handleChangeDate}
              onLinkClick={this.handleCalendarClick}
            />
          </Route>
          <Route exact path="/monthSelection" component={MonthSelection}>
            <MonthSelection
              today={this.state.today}
              month={this.state.month}
              year={this.state.year}
              startYear={this.startYear}
              onchangeDate={this.handleChangeDate}
              onLinkClick={this.handleMonthSelectionClick}
              /* href="/yearSelection" */
            />
          </Route>
          <Route exact path="/yearSelection" component={YearSelection}>
            <YearSelection
              today={this.state.today}
              month={this.state.month}
              year={this.state.year}
              startYear={this.startYear}
              onchangeDate={this.handleChangeDate}
            ></YearSelection>
          </Route>
        </>
      );
    }
  }
);

/* export default withRouter(App); */
/* const ShowTheLocation = withRouter(App); */

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.querySelector("#root")
);
