import React from "react";
import { Link, Redirect } from "react-router-dom";
import TaskCard from "../../../pages/TaskCard/TaskCard";

/*ссылка ведущая в окно newTask c пропсами, которые берет из steate
адрес динамический?! :id...*/

class Task extends React.Component {
  render() {
    return (
      <div>
        {/*  <Link className="link" to={`/tasks/${this.props.name}`}>
          {this.props.name}
        </Link> */}
        <p
          className="link"
          onClick={() => this.props.onTaskClick(this.props.task)}
          /*  value={this.props.task} */
        >
          {this.props.name}
        </p>
      </div>
    );
  }
}

export default Task;
