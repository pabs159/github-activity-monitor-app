import React, { Component } from "react";
import Vivus from "vivus";
import svg from "../components/svgs/some.svg";
import homepageSvg from "../components/svgs/homepageSvg.svg";

import MasterLayout from "../components/layouts/MasterLayout";
import HomepageImage from "../components/svgs/HomepageImage";

export default class Home extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    new Vivus("graph", { duration: 200, file: homepageSvg }, null);
  }

  render() {
    return (
      <MasterLayout>
        <div className="homepage-container">
          <div className="content">
            <div className="left-column">Left column home</div>
            <div className="right-column">
              <div id="graph" />
            </div>
          </div>
        </div>
      </MasterLayout>
    );
  }
}
