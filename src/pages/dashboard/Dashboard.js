import React, { Component } from "react";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log("accountsFollowed", this.props.accountsFollowed);
  }

  render() {
    return (
      <div className="dashboard-wrapper">
        <div className="container">Dashboard goes here...</div>
      </div>
    );
  }
}
