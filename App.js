import React from "react";
import Navigation from "./src/Navigation/Navigation";

// REDUX
import { Provider } from "react-redux";
import Store from "./src/Store/configureStore";

export default class App extends React.Component {
  render() {
    return (
      <Provider store={Store}>
        <Navigation />
      </Provider>
    );
  }
}
