import React, { Component } from "react";
import StudentHeatMap from "../../components/charts/StudentHeatMap";

export default class AccountDetail extends Component {
  render() {
    return (
      <div>
        <StudentHeatMap width={500} height={500} />
      </div>
    );
  }
}
