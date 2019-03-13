import React, { Component } from "react";
import axios from "axios";

export default class Dashboard extends Component {
  constructor() {
    super();

    this.state = {
      accounts: [],
      isLoading: true
    };
  }

  componentWillMount() {
    this.getAccounts();
  }

  getAccounts() {
    axios
      .get("https://bottega-activity-tracker-api.herokuapp.com/accounts", {
        withCredentials: true
      })
      .then(response => {
        this.setState({
          accounts: response.data.accounts,
          isLoading: false
        });
      })
      .catch(error => console.log("getAccounts error", error));
  }

  render() {
    return (
      <div className="dashboard-wrapper">
        <div className="container">Dashboard goes here...</div>
      </div>
    );
  }
}
