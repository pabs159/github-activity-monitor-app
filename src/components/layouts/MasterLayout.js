import React from "react";
import DashboardNavigation from "../navigation/DashboardNavigation";

const MasterLayout = props => {
  return <div className="corporate-layout-wrapper">{props.children}</div>;
};

export default MasterLayout;
