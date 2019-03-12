import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import { withRouter } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import LoginModal from "../modals/LoginModal";
import NavLogo from "../svgs/NavLogo";

class CorporateNavigation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false
    };

    this.handleLoginLinkClick = this.handleLoginLinkClick.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
  }

  handleSuccessfulAuth(data) {
    this.props.history.push("/");
    this.props.handleLogin(data);
  }

  handleLoginLinkClick = () => {
    this.setState({
      modalIsOpen: true
    });
  };

  handleModalClose = () => {
    this.setState({
      modalIsOpen: false
    });
  };

  render() {
    return (
      <div className="corporate-navigation-wrapper">
        <LoginModal
          modalIsOpen={this.state.modalIsOpen}
          handleModalClose={this.handleModalClose}
          handleSuccessfulAuth={this.handleSuccessfulAuth}
        />
        <div className="left-column">
          <Link to="/">
            <div className="brand">
              <NavLogo />
            </div>
          </Link>
        </div>

        <div className="right-column">
          <a onClick={this.handleLoginLinkClick}>
            <FontAwesomeIcon icon="sign-in-alt" />
          </a>
        </div>
      </div>
    );
  }
}

export default withRouter(CorporateNavigation);
