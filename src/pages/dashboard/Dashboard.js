import React, { Component } from "react";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
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
