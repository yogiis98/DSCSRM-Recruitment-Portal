
import React from "react";
import ReactDOM from "react-dom";
import {
  AppContainer
} from "react-hot-loader";
import { Provider } from "react-redux";
import configureStore from "./store";
import App from './App';


const render = () => {
  const store = configureStore();

  const user = localStorage.getItem('user');
  if(user) {
    store.dispatch({ type: "LOGIN_SUCCESSFUL", payload:{...JSON.parse(user)} });
  }

  return ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <App />
      </Provider>
    </AppContainer>,
    document.getElementById("root")
  );
}

render();

if (module.hot) {
  module.hot.accept("./App", () => {
    render();
  });
}