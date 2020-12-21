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
    this.props.setPlaylistID(playlist.id);
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
          <OpenTab
            userName={this.props.userInfo.userName}
            userOwnedPlaylists={this.props.userInfo.userOwnedPlaylists}
            importPlaylist={this.importPlaylist}
          />
        )}
      </div>
    );
  }
}

function OpenTab({ userName, userOwnedPlaylists, importPlaylist }) {
  return (
    <div>
      <p className="account-info-username">{userName}</p>
      <div className="user-playlists-container">
        <p className="import-playlist-title">Import playlist</p>
        <div>
          {userOwnedPlaylists.map((playlist) => {
            return (
              <p
                key={playlist.id}
                onClick={() => importPlaylist(playlist)}
                className={"user-playlist"}
              >
                {playlist.name}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
}
