import React from "react";
import { Link } from "react-router-dom";

import Layout from "../../components/layouts/MasterLayout";

const NoMatch = () => {
  return (
    <MasterLayout>
      <div className="error-page-container">
        <div className="content">
          <h2>
            It appears that you reached a page that doesn't exist, or that
            you're not logged in. <Link to="/">Return home</Link>
          </h2>
        </div>
      </div>
    </MasterLayout>
  );
};

export default NoMatch;
