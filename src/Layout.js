import React from "react";
import { Link } from "react-router-dom";

export default class Layout extends React.Component {
  render() {
    return (
      <>
        <Link className="nav-link" to="/">
          Главная
        </Link>
        <Link className="nav-link" to="/calendar">
          Календарь
        </Link>
        <Link className="nav-link" to="/test">
          Test
        </Link>
        <>
        {this.props.children}
        </>
      </>
    );
  }
}
