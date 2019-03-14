import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";

import Icons from "../helpers/icons";
import Home from "../pages/Home";
import Dashboard from "../pages/dashboard/Dashboard";
import NoMatch from "../pages/errors/NoMatch";
import DashboardNavigation from "./navigation/DashboardNavigation";
import CorporateNavigation from "./navigation/CorporateNavigation";
import MainLoader from "./loaders/MainLoader";

class App extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      loggedInStatus: "NOT_LOGGED_IN",
      user: {},
      accountsFollowed: []
    };

    Icons();

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleSuccessfulRegistration = this.handleSuccessfulRegistration.bind(
      this
    );
    this.handleAccountAddition = this.handleAccountAddition.bind(this);
  }

  handleAccountAddition(accountAdded) {
    this.setState({
      accountsFollowed: [accountAdded].concat(this.state.accountsFollowed)
    });
  }

  checkLoginStatus() {
    return axios({
      method: "get",
      url: `https://bottega-activity-tracker-api.herokuapp.com/logged_in`,
      withCredentials: true
    })
      .then(response => {
        if (
          response.data.logged_in &&
          this.state.loggedInStatus === "NOT_LOGGED_IN"
        ) {
          this.setState({
            loggedInStatus: "LOGGED_IN"
          });
        } else if (
          !response.data.logged_in &&
          this.state.loggedInStatus === "LOGGED_IN"
        ) {
          this.setState({
            loggedInStatus: "NOT_LOGGED_IN"
          });
        }

        this.setState({
          isLoading: false
        });

        if (this.state.loggedInStatus === "LOGGED_IN") {
          this.getAccounts();
        }
      })
      .catch(error => {
        console.log("checkLoginStatus error", error);
      });
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  handleSuccessfulRegistration(data) {
    this.setState({
      loggedInStatus: "LOGGED_IN",
      user: data.user
    });
  }

  handleLogin(data) {
    this.setState({
      loggedInStatus: "LOGGED_IN",
      user: data.user
    });
  }

  handleLogout() {
    console.log("logout triggered");
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN"
    });
  }

  routesForUsersNotLoggedIn() {
    return [
      <Route
        exact
        key="home"
        path="/"
        render={props => (
          <Home
            {...props}
            handleSuccessfulRegistration={this.handleSuccessfulRegistration}
          />
        )}
      />
    ];
  }

  routesForLoggedInUsers() {
    return [
      <Route
        exact
        key="dashboard"
        path="/"
        render={props => (
          <Dashboard
            {...props}
            accountsFollowed={this.state.accountsFollowed}
          />
        )}
      />
    ];
  }

  getAccounts() {
    axios
      .get("https://bottega-activity-tracker-api.herokuapp.com/accounts", {
        withCredentials: true
      })
      .then(response => {
        this.setState({
          accountsFollowed: response.data.accounts,
          isLoading: false
        });
      })
      .catch(error => console.log("getAccounts error", error));
  }

  navigationRenderer() {
    if (this.state.loggedInStatus === "LOGGED_IN") {
      return (
        <DashboardNavigation
          currentUser={this.state.user}
          handleAccountAddition={this.handleAccountAddition}
          handleLogout={this.handleLogout}
        />
      );
    } else {
      return <CorporateNavigation handleLogin={this.handleLogin} />;
    }
  }

  render() {
    if (this.state.isLoading) {
      return <MainLoader />;
    }

    return (
      <div className="app">
        <Router>
          <div>
            <div className="corporate-layout-wrapper">
              {this.navigationRenderer()}
            </div>
            <Switch>
              {this.state.loggedInStatus === "LOGGED_IN"
                ? this.routesForLoggedInUsers()
                : this.routesForUsersNotLoggedIn()}

              <Route component={NoMatch} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
