import React from "react";

function Nav(props) {
  const renderArrow = direction => {
    return (
      <div
        className="arrow"
        onClick={() => props.onArrowClick(direction, props.name)}
      >
        -
      </div>
    );
  };

  return (
    <div className="nav">
      {renderArrow("left")}
      <div className="title" onClick={props.onTitleClick}>
        {props.title}
      </div>
      {renderArrow("right")}
    </div>
  );
}

export default Nav;
