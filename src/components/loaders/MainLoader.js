import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MainLoader = () => {
  return (
    <div className="full-page-loader">
      <FontAwesomeIcon icon="spinner" spin />
    </div>
  );
};

export default MainLoader;
