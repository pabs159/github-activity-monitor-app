import React, { Component } from "react";
import axios from "axios";
import ReactVivus from "react-vivus";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _ from "lodash";

import githubLogo from "../../components/svgs/github-logo.svg";
import UserDataCard from "../../components/cards/UserDataCard";
import ChoroplethMap from "../../components/maps/ChoroplethMap";
import NewAccount from "./NewAccount";
import NavLogo from "../../components/svgs/NavLogo";
import AccountHeatMap from "../../components/charts/AccountHeatMap";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      contentToShow: "CHART",
      groupedEvents: []
    };

    this.handlePillClick = this.handlePillClick.bind(this);
    this.handleSuccessfulNewAccountCreation = this.handleSuccessfulNewAccountCreation.bind(
      this
    );
    this.handleLogoutLinkClick = this.handleLogoutLinkClick.bind(this);
  }

  handleLogoutLinkClick() {
    this.signOut();
  }

  signOut(event) {
    axios
      .delete(`https://bottega-activity-tracker-api.herokuapp.com/logout`, {
        withCredentials: true
      })
      .then(response => {
        this.props.handleLogout();
        return response;
      })
      .catch(error => {
        console.log(error);
      });

    event.preventDefault();
  }

  handleSuccessfulNewAccountCreation(account) {
    this.props.handleAccountAddition(account);
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
      })
      .catch(error => console.log("getAccounts error", error));
  }

  getGroupedEvents() {
    axios
      .get(
        "https://bottega-activity-tracker-api.herokuapp.com/grouped_events",
        { withCredentials: true }
      )
      .then(response => {
        const groupedAccountKeys = Object.keys(response.data.events);

        const eventData = groupedAccountKeys.map((account, idx) => {
          const datesPerAccount = Object.keys(response.data.events[account]);
          const binsData = datesPerAccount.map((date, nestedIdx) => {
            return {
              bin: nestedIdx,
              count: response.data.events[account][date].length * 15,
              date: date,
              login: response.data.events[account][date][0].username
            };
          });

          return {
            bin: idx,
            bins: binsData
          };
        });

        // const groupedEvents = groupedEventKeys.map((groupedEvent, idx) => {
        //   return {
        //     bin: idx
        //   };
        // });

        this.setState({
          isLoading: false,
          groupedEvents: eventData
        });
      })
      .catch(error => {
        console.log("getGroupedEvents error", error);
      });
  }

  componentWillMount() {
    this.getAccounts();
    this.getGroupedEvents();
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
        return (
          <div>
            <AccountHeatMap
              data={this.state.groupedEvents}
              width={1200}
              height={600}
            />
          </div>
        );
      } else if (this.state.contentToShow === "MAP") {
        return <ChoroplethMap />;
      } else if (this.state.contentToShow === "FEED") {
        return <div className="user-data-cards">{accountList}</div>;
      } else if (this.state.contentToShow === "NEW") {
        return (
          <NewAccount
            handleSuccessfulNewAccountCreation={
              this.handleSuccessfulNewAccountCreation
            }
          />
        );
      } else {
        return <div>Else...</div>;
      }
    };

    return (
      <div>
        <div className="corporate-layout-wrapper">
          <div className="corporate-navigation-wrapper">
            <div className="left-column">
              <a onClick={() => this.handlePillClick("CHART")}>
                <div className="brand">
                  <NavLogo />
                </div>
              </a>

              <div className="pills">
                <a onClick={() => this.handlePillClick("CHART")}>Chart</a>
                <a onClick={() => this.handlePillClick("FEED")}>Feed</a>
                <a onClick={() => this.handlePillClick("MAP")}>Map</a>
                <a onClick={() => this.handlePillClick("NEW")}>
                  Add New Account
                </a>
              </div>
            </div>

            <div className="right-column">
              <a onClick={this.handleLogoutLinkClick}>
                <FontAwesomeIcon icon="sign-out-alt" />
              </a>
            </div>
          </div>
        </div>
        <div className="dashboard-wrapper">
          {this.state.contentToShow !== "NEW" && accountList.length === 0 ? (
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
          ) : (
            <div className="container">
              <div className="content">{contentRenderer()}</div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
