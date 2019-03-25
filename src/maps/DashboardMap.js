import React, { Component } from "react";
import USAMap from "react-usa-map";
import Axios from "axios";

class DashboardMap extends Component {
  mapHandler = event => {
    alert(event.target.dataset.name);
  };

  statesCustomConfig = () => {
    return {
      NJ: {
        fill: "navy",
        clickHandler: event =>
          console.log("Custom handler for NJ", event.target.dataset)
      },
      NY: {
        fill: "#CC0000"
      }
    };
  };

  componentWillMount() {
    this.getLocations();
  }

  getLocations() {
    Axios.get("https://bottega-activity-tracker-api.herokuapp.com/locations", {
      withCredentials: true
    })
      .then(response => {
        console.log("res from get locations", response);
      })
      .catch(error => {
        console.log("error from getting locations", error);
      });
  }

  render() {
    return (
      <div className="DashboardMap">
        <USAMap
          customize={this.statesCustomConfig()}
          onClick={this.mapHandler}
        />
      </div>
    );
  }
}

export default DashboardMap;
