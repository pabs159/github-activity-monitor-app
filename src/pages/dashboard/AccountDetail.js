import React, { Component } from "react";
import AccountHeatMap from "../../components/charts/AccountHeatMap";

export default class AccountDetail extends Component {
  render() {
    return (
      <div>
        <AccountHeatMap width={500} height={500} />
      </div>
    );
  }
}
