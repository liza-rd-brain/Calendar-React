import React from "react";
import Month from "./Month/Month";
import Arrow from "./Arrow/Arrow";

class Nav extends React.Component {
  renderArrow(data) {
    return <Arrow onClick={() => this.props.onClick(data)} />;
  }
  render() {
    return (
      <div className="nav">
        {this.renderArrow("left")}
        <Month month={this.props.month} year={this.props.year} />
        {this.renderArrow("right")}
      </div>
    );
  }
}

export default Nav;
