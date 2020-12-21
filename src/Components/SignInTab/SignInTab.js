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

  handleSignIn = () => {
    Spotify.getAccessToken();
  };

  async componentDidMount() {
    if (window.location.href.match(/access_token=([^&]*)/)) {
      try {
        const userResponse = await Spotify.getUserInfo();
        this.setState({ isSignedIn: true, userInfo: userResponse });
        if (!userResponse.ok) {
          throw Error(userResponse.statusText);
        }
      } catch (e) {
        console.log(e);
      }
    }
  }

  setUserInfoPlaylistsState = async () => {
    const updatedUserOwnedPlaylists = await Spotify.getUserOwnedPlaylists();
    this.setState({
      userInfo: { ...this.state.userInfo, userOwnedPlaylists: updatedUserOwnedPlaylists },
    });
  };

  render() {
    if (this.state.isSignedIn) {
      return (
        <AccountInfo
          userInfo={this.state.userInfo}
          setUserInfoPlaylistsState={this.setUserInfoPlaylistsState}
          addTrack={this.props.addTrack}
          updatePlaylistName={this.props.updatePlaylistName}
          playlistName={this.props.playlistName}
          emptyPlaylist={this.props.emptyPlaylist}
          setPlaylistID={this.props.setPlaylistID}
        />
      );
    } else {
      return (
        <button onClick={this.handleSignIn} className="sign-in-tab">
          <div className="sign-in-text">
            <p>Login to </p>
            <p>SPOTIFY</p>
          </div>
        </button>
      );
    }
  }
}
