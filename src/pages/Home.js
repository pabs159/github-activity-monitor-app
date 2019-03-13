import React, { Component } from "react";
import Vivus from "vivus";
import homepageSvg from "../components/svgs/homepageSvg.svg";
import Register from "../components/auth/Register";

import MasterLayout from "../components/layouts/MasterLayout";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.handleSuccessfulRegistration = this.handleSuccessfulRegistration.bind(
      this
    );
  }

  handleSuccessfulRegistration(data) {
    this.props.handleSuccessfulRegistration(data);
  }

  componentDidMount() {
    new Vivus("graph", { duration: 200, file: homepageSvg }, null);
  }

  render() {
    return (
      <MasterLayout>
        <div className="homepage-container">
          <div className="content">
            <div className="left-column">
              <div id="graph" />
            </div>
            <div className="right-column">
              <Register
                handleSuccessfulRegistration={this.handleSuccessfulRegistration}
              />
            </div>
          </div>
        </div>
      </MasterLayout>
    );
  }
}
