import React from "react";

import MasterLayout from "../components/layouts/MasterLayout";
import HomepageImage from "../components/svgs/HomepageImage";

const Home = () => {
  return (
    <MasterLayout>
      <div className="homepage-container">
        <div className="content">
          <div className="left-column">Left column home</div>
          <div className="right-column">
            <HomepageImage />
          </div>
        </div>
      </div>
    </MasterLayout>
  );
};

export default Home;
