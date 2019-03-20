import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";

const UserDataCard = props => {
  const { login, avatar_url, events } = props.account;

  const latestEvent = events.sort(function compare(a, b) {
    var dateB = new Date(b.date);
    var dateA = new Date(a.date);
    return dateB - dateA;
  });

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

      {latestEvent ? (
        <div className="user-data-details">
          <div className="data-wrapper">
            <span className="label">
              <FontAwesomeIcon icon="calendar-check" />
            </span>{" "}
            <span className="title">
              Last activity {moment(latestEvent[0].date).fromNow()}
            </span>
          </div>
          <div className="data-wrapper">
            <span className="label">
              <FontAwesomeIcon icon="code-branch" />
            </span>{" "}
            <span className="title">{latestEvent[0]["message"]}</span>
          </div>
          <div className="data-wrapper">
            <span className="label">
              <FontAwesomeIcon icon="tasks" />
            </span>{" "}
            <span className="title">
              <a
                href={"https://github.com/" + latestEvent[0]["repo_name"]}
                target="_blank"
              >
                {latestEvent[0]["repo_name"]}
              </a>
            </span>
          </div>

          <div className="action-links">
            <a>
              <FontAwesomeIcon icon="user-times" />
              Remove
            </a>

            <a href={`https://github.com/${login}`} target="_blank">
              <FontAwesomeIcon icon="external-link-alt" />
              GitHub Profile
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default UserDataCard;
