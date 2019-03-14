import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import { withRouter } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

import NavLogo from "../svgs/NavLogo";
import NewAccountModal from "../modals/NewAccountModal";

class DashboardNavigation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false
    };

    this.handleLogoutLinkClick = this.handleLogoutLinkClick.bind(this);
    this.handleSuccessfulAccountAddition = this.handleSuccessfulAccountAddition.bind(
      this
    );
    this.handleModalClose = this.handleModalClose.bind(this);
  }

  handleModalClose = () => {
    this.setState({
      modalIsOpen: false
    });
  };

  handleSuccessfulAccountAddition(accountAdded) {
    // TODO
    // render them in the dashboard
    // console.log("handleSuccessfulAccountAddition", accountAdded);
    this.props.handleAccountAddition(accountAdded);
  }

  handleLogoutLinkClick = () => {
    this.signOut();
  };

  handleNewAccountClick = () => {
    this.setState({
      modalIsOpen: true
    });
  };

  signOut(event) {
    axios
      .delete(`https://bottega-activity-tracker-api.herokuapp.com/logout`, {
        withCredentials: true
      })
      .then(response => {
        this.props.history.push("/");
        this.props.handleLogout();
        return response;
      })
      .catch(error => {
        console.log(error);
      });

    event.preventDefault();
  }

  render() {
    return (
      <div className="corporate-navigation-wrapper">
        <NewAccountModal
          modalIsOpen={this.state.modalIsOpen}
          handleModalClose={this.handleModalClose}
          handleSuccessfulAccountAddition={this.handleSuccessfulAccountAddition}
        />

        <div className="left-column">
          <Link to="/">
            <div className="brand">
              <NavLogo />
            </div>
          </Link>

          <div className="nav-link-wrapper">
            <a onClick={this.handleNewAccountClick}>
              <FontAwesomeIcon icon="plus-square" />
              <div className="text">Track New User</div>
            </a>
          </div>

          <div className="nav-link-wrapper">
            <NavLink to="/webinars" activeClassName="active-nav-link">
              <FontAwesomeIcon icon="filter" />
              <div className="text">Filters</div>
            </NavLink>
          </div>
        </div>

        <div className="right-column">
          <a onClick={this.handleLogoutLinkClick}>
            <FontAwesomeIcon icon="sign-out-alt" />
          </a>
        </div>
      </div>
    );
  }
}

export default withRouter(DashboardNavigation);
