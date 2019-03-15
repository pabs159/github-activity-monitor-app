import React, { Component } from "react";
import axios from "axios";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true
    };
  }

  getAccounts() {
    axios
      .get("https://bottega-activity-tracker-api.herokuapp.com/accounts", {
        withCredentials: true
      })
      .then(response => {
        this.props.populateAccounts(response.data.accounts);

        this.setState({
          isLoading: false
        });
      })
      .catch(error => console.log("getAccounts error", error));
  }

  componentWillMount() {
    this.getAccounts();
  }

  render() {
    if (this.state.isLoading) {
      return <div>Loading...</div>;
    }

    let accountList = [];

    if (this.props.accountsFollowed && this.props.accountsFollowed.length > 0) {
      accountList = this.props.accountsFollowed.map(account => {
        return <div>{account.username}</div>;
      });
    }

    // TODO
    // Render list of users
    // Task from previous app
    return (
      <div className="dashboard-wrapper">
        {accountList.length > 0 ? (
          <div className="container">{accountList}</div>
        ) : null}
      </div>
    );
  }
}
