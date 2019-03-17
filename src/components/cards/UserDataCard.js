import React from "react";
import { Link } from "react-router-dom";

const UserDataCard = props => {
  const { login, avatar_url } = props.account;

  console.log("props account", props.account);

  return (
    <div className="user-data-card">
      <div className="follower-avatar">
        <Link to={`/account/${login}`}>
          <img src={avatar_url} alt={login} />
        </Link>
        <div className="follower-username">
          <Link to={`/account/${login}`}>{login}</Link>
        </div>
      </div>
      <div className="follower-chart-wrapper">
        <h1>Chart goes here</h1>
      </div>
    </div>
  );
};

export default UserDataCard;
