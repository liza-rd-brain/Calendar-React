import React from "react";
import { Provider } from "react-redux";
import { connect } from "react-redux";
import { createStore } from "redux";

import styled, { ThemeProvider } from "styled-components";

const Title = styled.h2`
  color: white;
`;
const ItemList = styled.li`
  color: white;
`;

// Redux:________________________________-
const ADD = "ADD";

//action
const addMessage = (message) => {
  return {
    type: ADD,
    message: message,
  };
};
const initialState = ["123", "456"];
//reducer
const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD:
      return [...state, action.message];
    default:
      return state;
  }
};

const store = createStore(messageReducer);

// React:
class Presentational extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
  }
  
  handleChange(event) {
    this.setState({
      input: event.target.value,
    });
  }

  submitMessage() {
    this.props.submitNewMessage(this.state.input);
    this.setState({
      input: "",
    });
  }
  render() {
    return (
      <div>
        <Title>Type in a new Message:</Title>
        <input value={this.state.input} onChange={this.handleChange} />
        <br />
        <button onClick={this.submitMessage}>Submit</button>
        <ul>
          {this.props.messages.map((message, idx) => {
            return <ItemList key={idx}>{message}</ItemList>;
          })}
        </ul>
      </div>
    );
  }
}

// React-Redux:
const mapStateToProps = (state) => {
  return { messages: state };
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitNewMessage: (newMessage) => {
      dispatch(addMessage(newMessage));
    },
  };
};

const ContainerNew = connect(
  mapStateToProps,
  mapDispatchToProps
)(Presentational);

export default class AppWrapper extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Provider store={store}>
        <ContainerNew />
      </Provider>
    );
  }
}
