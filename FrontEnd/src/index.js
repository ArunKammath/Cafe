import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AppRoot from "./App";
import { Provider } from "react-redux";
import store from "./app/store.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppRoot /> 
    </Provider>
  </React.StrictMode>
);


