import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import { withRouter } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

import NavLogo from "../svgs/NavLogo";

class DashboardNavigation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false
    };

    this.handleLogoutLinkClick = this.handleLogoutLinkClick.bind(this);
  }

  handleLogoutLinkClick = () => {
    this.signOut();
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

          <div className="nav-link-wrapper">
            <NavLink to="/courses" activeClassName="active-nav-link">
              <FontAwesomeIcon icon="plus-square" />
              <div className="text">Track New User</div>
            </NavLink>
          </div>

          <div className="nav-link-wrapper">
            <NavLink to="/webinars" activeClassName="active-nav-link">
              <FontAwesomeIcon icon="chalkboard-teacher" />
              <div className="text">Track New User</div>
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
