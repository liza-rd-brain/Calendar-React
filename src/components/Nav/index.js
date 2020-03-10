import React from "react";
import { Link } from "react-router-dom";
import Title from "./Title/Title";
import Arrow from "./Arrow/Arrow";

class Nav extends React.Component {
  renderArrow(direction) {
    return <Arrow onArrowClick={() => this.props.onArrowClick(direction)} />;
  }

  render() {
    return (
      <div className="nav">
        {this.renderArrow("left")}
        <Title
         /*  month={this.props.month}
          year={this.props.year} */
          onTitleClick={this.props.onTitleClick}
          title={this.props.title}
        />
        {this.renderArrow("right")}
      </div>
    );
  }
}

export default Nav;
