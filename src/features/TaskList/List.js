import React from "react";

function List(props) {
  const taskList = props.taskList.map((item) => {
    return (
      <div key={item.id} className="link">
        <p className="link" onClick={() => props.onTaskClick(item)}>
          {item.name}
        </p>
      </div>
    );
  });
  return <div className="list">{taskList}</div>;
}

export default List;
