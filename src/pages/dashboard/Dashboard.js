import React, { Component } from "react";
import axios from "axios";
import ReactVivus from "react-vivus";

import githubLogo from "../../components/svgs/github-logo.svg";
import UserDataCard from "../../components/cards/UserDataCard";
import ChoroplethMap from "../../components/maps/ChoroplethMap";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      contentToShow: "CHART"
    };

    this.handlePillClick = this.handlePillClick.bind(this);
  }

  handlePillClick(contentToShow) {
    this.setState({ contentToShow });
  }

  getAccounts() {
    axios
      .get("https://bottega-activity-tracker-api.herokuapp.com/accounts", {
        withCredentials: true
      })
      .then(response => {
        this.props.populateAccounts(response.data.accounts);

        this.setState({
          isLoading: false
        });
      })
      .catch(error => console.log("getAccounts error", error));
  }

  componentWillMount() {
    this.getAccounts();
  }

  // TODO
  // The API is auto creating the events when an account is created.
  // Github API limits 'events'. So get the total number of pages from API header res
  // And create all 300 max events and store in db.
  // Make sure to add some type of id from github and then create rake task that iterates through
  // each account daily and adds any new events.

  render() {
    if (this.state.isLoading) {
      return <div>Loading...</div>;
    }

    let accountList = [];

    if (this.props.accountsFollowed && this.props.accountsFollowed.length > 0) {
      accountList = this.props.accountsFollowed.map(account => {
        return <UserDataCard key={account.id} account={account} />;
      });
    }

    const contentRenderer = () => {
      if (this.state.contentToShow === "CHART") {
        return <div className="user-data-cards">{accountList}</div>;
      } else if (this.state.contentToShow === "MAP") {
        return <ChoroplethMap />;
      } else {
        return <div>Else...</div>;
      }
    };

    return (
      <div className="dashboard-wrapper">
        {accountList.length > 0 ? (
          <div className="container">
            <div className="content">
              <div className="pills">
                <a onClick={() => this.handlePillClick("CHART")}>Chart</a>
                <a onClick={() => this.handlePillClick("FEED")}>Feed</a>
                <a onClick={() => this.handlePillClick("MAP")}>Map</a>
                <a onClick={() => this.handlePillClick("NEW")}>
                  Add New Account
                </a>
              </div>

              {contentRenderer()}
            </div>
          </div>
        ) : (
          <div className="empty-dashboard-wrapper">
            <div className="content">
              <ReactVivus
                id="homepage-svg"
                option={{
                  file: githubLogo,
                  type: "oneByOne",
                  animTimingFunction: "EASE",
                  duration: 250,
                  onReady: console.log
                }}
                style={{ width: "100%" }}
              />

              <div className="text">
                You're not following any GitHub users, add your first account
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
