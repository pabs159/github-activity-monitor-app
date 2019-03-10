import React, { Component } from "react";
import ReactModal from "react-modal";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

ReactModal.setAppElement(".app-wrapper");

export default class LoginModal extends Component {
  constructor(props) {
    super(props);

    this.customStyles = {
      overlay: {
        backgroundColor: "rgba(1, 1, 1, 0.75)"
      },
      content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        width: "342px"
      }
    };

    this.state = {
      email: "",
      password: "",
      loginError: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    axios
      .post(
        "https://bottega-activity-tracker-api.herokuapp.com/sessions",
        {
          user: {
            email: this.state.email,
            password: this.state.password
          }
        },
        { withCredentials: true }
      )
      .then(response => {
        if (response.data.logged_in) {
          this.props.handleSuccessfulAuth(response.data);
        } else {
          this.setState({
            loginError: "There was an error logging in."
          });
        }
      })
      .catch(error => {
        console.log("in handle submit error", error);
        this.setState({
          loginError: "There was an error logging in."
        });
      });

    event.preventDefault();
  }

  render() {
    return (
      <ReactModal
        isOpen={this.props.modalIsOpen}
        onRequestClose={() => {
          this.props.handleModalClose();
        }}
        style={this.customStyles}
      >
        <form onSubmit={this.handleSubmit} className="form-wrapper">
          {this.state.loginError ? (
            <div className="form-error">
              <FontAwesomeIcon icon="exclamation-circle" />
              {this.state.loginError}
            </div>
          ) : null}
          <div className="form-group">
            <div className="icon-wrapper">
              <FontAwesomeIcon icon="at" />
            </div>
            <input
              className="full-width-element"
              type="email"
              name="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.handleChange}
              required
            />
          </div>

          <div className="form-group">
            <div className="icon-wrapper">
              <FontAwesomeIcon icon="key" />
            </div>
            <input
              className="full-width-element"
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
              required
            />
          </div>

          <div className="login-btn-wrapper">
            <button
              className="primary-rounded-button button-small"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </ReactModal>
    );
  }
}
