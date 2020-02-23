import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  withRouter
} from "react-router-dom";

import DateTimeInput from "../../components/DateTimeInput/DateTimeInput";

class NewTask extends React.Component {
  render() {
    return (
      /*  <div className="task"> */
      <form className="form" onSubmit={this.props.onChangeTaskList}>
        <input
          name={this.props.nameValue}
          type="text"
          placeholder="Название задачи"
          /*  value={this.props.name} */
          onChange={this.props.onCreateNewTask}
        />

        <DateTimeInput
          title={this.props.startInputTitle}
          dateValue={this.props.startDateValue}
          timeValue={this.props.startTimeValue}
          onChange={this.props.onCreateNewTask}
        />

        <DateTimeInput
          title={this.props.endInputTitle}
          dateValue={this.props.endDateValue}
          timeValue={this.props.endTimeValue}
          onChange={this.props.onCreateNewTask}
        />

        <textarea
          className="textarea"
          name={this.props.descValue}
          col="50"
          row="20"
          placeholder="Описание задачи"
          /*      value={this.props.desc} */
          onChange={this.props.onCreateNewTask}
        />
        <input className="button" type="submit" value="сохранить" />
      </form>
      /*   </div> */
    );
  }
}

export default NewTask;
