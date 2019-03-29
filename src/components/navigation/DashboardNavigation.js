import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import { withRouter } from "react-router";
import axios from "axios";

import NavLogo from "../svgs/NavLogo";

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
    this.props.handleAccountAddition(accountAdded);
    this.setState({
      modalIsOpen: false
    });
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
        <div className="left-column">
          <Link to="/">
            <div className="brand">
              <NavLogo />
            </div>
          </Link>
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
