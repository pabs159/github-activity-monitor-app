import React, { Component } from "react";
import { withRouter } from "react-router";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      registrationError: ""
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
        "https://bottega-activity-tracker-api.herokuapp.com/registrations",
        {
          user: {
            email: this.state.email,
            password: this.state.password
          }
        },
        { withCredentials: true }
      )
      .then(response => {
        if (response.data.status === "created") {
          this.props.history.push("/");
          this.props.handleSuccessfulRegistration(response.data);
        } else {
          this.setState({
            registrationError: "There was an error creating your account."
          });
        }
      })
      .catch(error => {
        console.log("in handle submit error for registrations", error);
        this.setState({
          registrationError: "There was an error creating your account."
        });
      });

    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="form-wrapper">
        {this.state.registrationError ? (
          <div className="form-error">
            <FontAwesomeIcon icon="exclamation-circle" />
            {this.state.registrationError}
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
          <button className="primary-rounded-button button-small" type="submit">
            Sign up for a free account
          </button>
        </div>
      </form>
    );
  }
}

export default withRouter(Register);
