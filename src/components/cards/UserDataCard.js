import React from "react";

const UserDataCard = props => {
  const { login, avatar_url } = props.account;

  return (
    <div className="user-data-card">
      <div className="follower-avatar">
        <a href={`https://github.com/${login}`} target="_blank">
          <img src={avatar_url} alt={login} />
        </a>
        <div className="follower-username">
          <a href={`https://github.com/${login}`} target="_blank">
            {login}
          </a>
        </div>
      </div>
      <div className="follower-chart-wrapper">
        <h1>Chart goes here</h1>
      </div>
    </div>
  );
};

export default UserDataCard;
