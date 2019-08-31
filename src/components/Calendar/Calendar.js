import React from "react";
/* import Day from "../Day/Day"; */
import Nav from "./Nav/Nav";
import NameDays from "./NameDays/NameDays";
import GridDays from "./GridDays/GridDays";

export default class Calendar extends React.Component {
  constructor() {
    super();
    this.state = {
      today: new Date()
    };
  }
  render() {
      
   /*  const today = new Date().getDate();
    console.log(today); */
    // return <Day item={today} />;
    // return (<>Calendar</>);
    return (
      <div className="calendar">
        <Nav />
        <NameDays />
        <GridDays today={this.state.today} />
      </div>
    );
  }
}
