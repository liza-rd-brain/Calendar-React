import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  withRouter,
  Redirect
} from "react-router-dom";

import moment from "moment";
import DateTimeInput from "../../components/DateTimeInput/DateTimeInput";

class TaskCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taskName: "",
      taskDesc: "",
      taskStartTime: "",
      taskStartDate: "",
      taskEndTime: "",
      taskEndDate: ""
    };
    this.nameValue = "name";
    this.descValue = "desc";

    this.startDateValue = "startDate";
    this.startTimeValue = "startTime";

    this.endDateValue = "endDate";

    this.endTimeValue = "endTime";
    this.handleEditTask = this.handleEditTask.bind(this);
    this.handleSaveTask = this.handleSaveTask.bind(this);
    this.handleChangeTask = this.handleChangeTask.bind(this);
  }

  handleEditTask(event) {
    const name = event.target.name;

    switch (name) {
      case this.nameValue:
        this.setState({
          taskName: event.target.value
        });
        break;
      case this.descValue:
        this.setState({
          taskDesc: event.target.value
        });
        break;
      case this.startDateValue:
        this.setState({
          taskStartDate: event.target.value
        });
        break;
      case this.startTimeValue:
        this.setState({
          taskStartTime: event.target.value
        });
        break;
      case this.endDateValue:
        this.setState({
          taskEndDate: event.target.value
        });
        break;
      case this.endTimeValue:
        this.setState({
          taskEndTime: event.target.value
        });
        break;
      default:
        console.log("Error!");
    }
  }

  handleSaveTask(event) {
    event.preventDefault();

    let task = {
      name: this.state.taskName,
      desc: this.state.taskDesc,
      startDate: this.state.taskStartDate,
      startTime: this.state.taskStartTime,
      endDate: this.state.taskEndDate,
      endTime: this.state.taskEndTime
    };

    this.props.onChangeTaskList(task, this.props.action);
  }

  handleChangeTask() {
    console.log("изменяем задачу");
    event.preventDefault();

    /*отличие =id*/

    this.props.сurrTask;
    let task = {
      id: this.props.сurrTask.id,
      name: this.state.taskName,
      desc: this.state.taskDesc,
      startDate: this.state.taskStartDate,
      startTime: this.state.taskStartTime,
      endDate: this.state.taskEndDate,
      endTime: this.state.taskEndTime
    };

    this.props.onChangeTaskList(task);
  }

  componentDidMount() {
    /*пришел заполненный элемент!!
    его обновлять или удалять */
    if (this.props.сurrTask) {
      this.editForm = this.fillForm();
    }

    /* window.addEventListener("onunload", () => {
      alert("перезагрузка");
      console.log(перезагрузка);
    }); */
  }

  componentWillUnmount() {}

  fillForm() {
    console.log("заполнить форму!");
    this.setState(
      {
        taskName: this.props.сurrTask.name,
        taskDesc: this.props.сurrTask.desc,
        taskStartTime: this.props.сurrTask.startTime,
        taskStartDate: this.props.сurrTask.startDate,
        taskEndTime: this.props.сurrTask.endTime,
        taskEndDate: this.props.сurrTask.endDate
      },
      () => console.log(this.state)
    );
  }

  render() {
    return (
      <form
        className="form"
        onSubmit={
          this.props.сurrTask ? this.handleChangeTask : this.handleSaveTask
        }
      >
        <input
          required
          name={this.nameValue}
          type="text"
          placeholder="Название задачи"
          onChange={this.handleEditTask}
          value={this.state.taskName}
        />

        <DateTimeInput
          class="start"
          title={this.props.startInputTitle}
          dateName={this.startDateValue}
          timeName={this.startTimeValue}
          dateValue={this.state.taskStartDate}
          /* dateValue="2019-03-03"  */
          timeValue={this.state.taskStartTime}
          onChange={this.handleEditTask}
        />

        <DateTimeInput
          class="end"
          title={this.props.endInputTitle}
          dateName={this.endDateValue}
          timeName={this.endTimeValue}
          dateValue={this.state.taskEndDate}
          timeValue={this.state.taskEndTime}
          onChange={this.handleEditTask}
        />

        <textarea
          className="textarea"
          name={this.descValue}
          col="50"
          row="20"
          placeholder="Описание задачи"
          onChange={this.handleEditTask}
          value={this.state.taskDesc}
        />
        <div className="button_wrap">
        <input className="button" type="submit" value="сохранить" />
        <input
          className="button"
          type="button"
          value="удалить"
          onClick={() => this.props.handleDeleteTask(this.props.сurrTask)}
        />
        </div>
      </form>
    );
  }
}

export default withRouter(TaskCard);
