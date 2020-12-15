import React from "react";
import "./SignInTab.css";
import Spotify from "../../util/Spotify";
import AccountInfo from "./AccountInfo";

export class SignInTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignedIn: false,
      userInfo: null,
    };
  }

  handleClick = () => {
    Spotify.getAccessToken();
  };

  componentDidMount() {
    if (window.location.href.match(/access_token=([^&]*)/)) {
      Spotify.getUserInfo().then((userResponse) => {
        this.setState({ isSignedIn: true, userInfo: userResponse });
      });
    }
  }

  render() {
    if (this.state.isSignedIn) {
      return (
        <AccountInfo
          userInfo={this.state.userInfo}
          addTrack={this.props.addTrack}
          updatePlaylistName={this.props.updatePlaylistName}
        />
      );
    } else {
      return (
        <div onClick={this.handleClick} className="sign-in-tab">
          <div className="sign-in-text">
            <p>SPOTIFY</p>
            <p>LOGIN</p>
          </div>
        </div>
      );
    }
  }
}
