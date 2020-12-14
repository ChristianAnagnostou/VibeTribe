import React, { Component } from "react";
import "./SignInTab.css";
import Spotify from "../../util/Spotify";

export class SignInTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isSignedIn: false };
  }

  handleClick = () => {
    Spotify.getAccessToken();
  };
  componentDidMount() {
    if (window.location.href.match(/access_token=([^&]*)/)) {
      this.setState({ isSignedIn: true });
    }
  }

  render() {
    if (!this.state.isSignedIn) {
      return (
        <div onClick={this.handleClick} className="sign-in-tab">
          <div className="sign-in-text">
            <p>SPOTIFY</p>
            <p>SIGN IN</p>
          </div>
        </div>
      );
    } else {
      return <></>;
    }
  }
}
