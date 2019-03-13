import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MainLoader = props => {
  return (
    <div className="full-page-loader">
      <FontAwesomeIcon icon="spinner" spin />
    </div>
  );
};

export default MainLoader;
