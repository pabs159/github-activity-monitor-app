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
        width: "342px"
      }
    };

    this.state = {
      username: "",
      error: ""
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
        "https://bottega-activity-tracker-api.herokuapp.com/accounts",
        {
          account: {
            username: this.state.username
          }
        },
        { withCredentials: true }
      )
      .then(response => {
        this.setState({
          username: "",
          error: ""
        });

        console.log("respone in modal", response);

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
              className="full-width-element"
              type="text"
              name="username"
              placeholder="Github username"
              value={this.state.username}
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
