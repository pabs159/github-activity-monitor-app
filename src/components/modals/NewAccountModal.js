import React, { Component } from "react";
import ReactModal from "react-modal";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

ReactModal.setAppElement(".app-wrapper");

export default class NewAccountModal extends Component {
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
        width: "600px"
      }
    };

    this.state = {
      login: "",
      city: "",
      state: "",
      postal: "",
      error: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    const { login, city, state, postal } = this.state;

    axios
      .post(
        "https://bottega-activity-tracker-api.herokuapp.com/accounts",
        {
          account: {
            login: login,
            city: city,
            state: state,
            postal: postal
          }
        },
        { withCredentials: true }
      )
      .then(response => {
        this.setState({
          login: "",
          city: "",
          state: "",
          postal: "",
          error: ""
        });

        this.props.handleSuccessfulAccountAddition(response.data.account);
      })
      .catch(error => {
        console.log("in handle submit error for new account", error);
        this.setState({
          error:
            "There was an error adding that account. Are you sure you haven't already added that username?"
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
          {this.state.error ? (
            <div className="form-error">
              <FontAwesomeIcon icon="exclamation-circle" />
              {this.state.error}
            </div>
          ) : null}
          <div className="form-group">
            <div className="icon-wrapper">
              <FontAwesomeIcon icon="at" />
            </div>
            <input
              className="new-account-username-field"
              type="text"
              name="login"
              placeholder="Github username"
              value={this.state.login}
              onChange={this.handleChange}
              required
            />
          </div>

          <div className="address-form-wrapper">
            <div className="icon-wrapper">
              <FontAwesomeIcon icon="location-arrow" />
            </div>

            <input
              type="text"
              name="city"
              placeholder="City"
              value={this.state.city}
              onChange={this.handleChange}
              required
            />

            <input
              type="text"
              name="state"
              placeholder="State"
              value={this.state.state}
              onChange={this.handleChange}
              required
            />

            <input
              type="text"
              name="postal"
              placeholder="Postal code"
              value={this.state.postal}
              onChange={this.handleChange}
              required
            />
          </div>

          <div className="login-btn-wrapper">
            <button
              className="primary-rounded-button button-small"
              type="submit"
            >
              Start tracking
            </button>
          </div>
        </form>
      </ReactModal>
    );
  }
}
