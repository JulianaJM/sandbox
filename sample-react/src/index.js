import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import RuleList from "./containers/RuleListContainer";
import store from "./store/app-store";

const domElement = document.getElementById("root");
const reactElement = (
  <Provider store={store}>
    <RuleList />
  </Provider>
);

ReactDOM.render(reactElement, domElement);
