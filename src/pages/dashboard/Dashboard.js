import React, { Component } from "react";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log("accountsFollowed", this.props.accountsFollowed);
  }

  render() {
    const accountList = this.props.accountsFollowed.map(account => {
      return <div>{account.username}</div>;
    });

    return (
      <div className="dashboard-wrapper">
        {this.props.accountsFollowed &&
        this.props.accountsFollowed.length > 0 ? (
          <div className="container">{accountList}</div>
        ) : null}
      </div>
    );
  }
}
