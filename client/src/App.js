import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// COMPONENTS
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Auth from "./components/auth/Auth";
import Alert from "./components/layout/Alert";
import Dashboard from "./components/dashboard/Dashboard";
import Profile from "./components/dashboard/Main/Profile";
import Post from "./components/dashboard/Main/Post";
import Footer from "./components/layout/Footer";
// ACTIONS
import { loadUser } from "./actions/auth";
// UTILS
import setAuthToken from "./utils/setAuthToken";
import PrivateRoute from "./utils/PrivateRoute";
// CSS
import "semantic-ui-css/semantic.min.css";
import "./App.scss";
// REDUX
import { Provider } from "react-redux";
import store from "./store";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          {/* <Navbar /> */}
          <section className="container">
            <Route exact path="/" component={Navbar} />
            <Alert />
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/auth" component={Auth} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/petProfile/:id" component={Profile} />
              <PrivateRoute exact path="/user/:user_id/post/:post_id" component={Post} />
            </Switch>

            <Route exact path="/" component={Footer} />
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
