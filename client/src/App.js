import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Auth from "./components/auth/Auth";
import "semantic-ui-css/semantic.min.css";
import "./App.scss";
import Alert from "./components/layout/Alert";

// REDUX
import { Provider } from "react-redux";
import store from "./store";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <section className="container">
            <Route exact path="/" component={Landing} />
            <Alert />
            <Switch>
              <Route exact path="/auth" component={Auth} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
