import React from "react";

import MasterLayout from "../components/layouts/MasterLayout";
import DashboardNavigation from "../components/navigation/DashboardNavigation";

const Home = () => {
  return (
    <MasterLayout>
      <DashboardNavigation />
      <div className="error-page-container">
        <div className="content">
          <h2>home!!!</h2>
        </div>
      </div>
    </MasterLayout>
  );
};

export default Home;
