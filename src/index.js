import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Login from "./components/Login";
import Registration from "./components/Registration";
import Home from "./components/Home";
import Chat from "./components/Chat";

import Logout from "./components/Logout";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";
const app = document.getElementById("spring-it");
render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <div>
          <Route exact path="/" name="Login" component={Login}></Route>
          <Route
            exact
            path="/Registration"
            name="Registration"
            component={Registration}
          ></Route>
          <Route exact path="/Home" name="Home" component={Home}></Route>
          <Route
            exact
            path="/Chat/:id/:name"
            name="Chat"
            component={Chat}
          ></Route>

          <Route exact path="/logout" name="type" component={Logout}></Route>
        </div>
      </Router>
    </PersistGate>
  </Provider>,
  app
);
