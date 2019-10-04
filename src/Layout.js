import React from "react";
import { Link } from "react-router-dom";

export default class Layout extends React.Component {
  render() {
    return (
      <>
        <Link className="nav-link" to="/">
          Главная
        </Link>
        <Link className="nav-link" to="/">
          Календарь
        </Link>
        <Link className="nav-link" to="/monthSelection">
          Test
        </Link>
        <>
        {this.props.children}
        </>
      </>
    );
  }
}
