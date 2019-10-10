import React from "react";
import { Link } from "react-router-dom";
import Month from "./Month/Month";
import Arrow from "./Arrow/Arrow";

class Nav extends React.Component {
  renderArrow(direction) {
    return <Arrow onClick={() => this.props.onClick(direction)} />;
  }

  render() {
    return (
      <div className="nav">
        {this.renderArrow("left")}
        <Link className="link" to={this.props.href || "#"}>
          <Month month={this.props.month} year={this.props.year} />
        </Link>

        {this.renderArrow("right")}
      </div>
    );
  }
}

export default Nav;
