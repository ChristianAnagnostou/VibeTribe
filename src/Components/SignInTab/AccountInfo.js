import React, { Component } from "react";
import "./AccountInfo.css";
import Spotify from "../../util/Spotify";
import equal from "fast-deep-equal";

export default class AccountInfo extends Component {
  constructor(props) {
    super(props);
    this.state = { tabActive: false };
  }

  componentDidUpdate(prevProps) {
    if (!equal(this.props.playlistName, prevProps.playlistName)) {
      this.props.setUserInfoPlaylistsState();
    }
  }

  toggleTab = (e) => {
    this.setState({ tabActive: !this.state.tabActive });
  };

  importPlaylist = (playlist) => {
    this.props.emptyPlaylist();
    this.props.updatePlaylistName(playlist.name);
    Spotify.getPlaylistSongs(playlist.id).then((songs) => {
      songs.map((song) => {
        this.props.addTrack({
          album: song.track.album.name,
          artist: song.track.artists[0].name,
          name: song.track.name,
          id: song.track.id,
          uri: song.track.uri,
        });
        return null;
      });
    });
  };

  render() {
    return (
      <div className="account-info-tab">
        <div className="user-image" onClick={this.toggleTab}>
          <img src={this.props.userInfo.userProfileImg} alt="User" className="user-image" />
        </div>
        {this.state.tabActive && (
          <div>
            <p className="account-info-title">Account</p>
            <p className="account-info-username">{this.props.userInfo.userName}</p>
            <div>
              <p className="import-playlist-title">Import playlist</p>
              <div>
                {this.props.userInfo.userOwnedPlaylists.map((playlist) => {
                  return (
                    <p
                      key={playlist.id}
                      onClick={() => this.importPlaylist(playlist)}
                      className={"user-playlist"}
                    >
                      {playlist.name}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
