import React, { useState } from "react";
import "./Playlist.css";
import { TrackList } from "../TrackList/TrackList";

export class Playlist extends React.Component {
  handlePlaylistNameChange = (e) => {
    this.props.updatePlaylistName(e.target.value);
  };

  render() {
    return (
      <div className="Playlist">
        <input
          type="text"
          value={this.props.playlistName}
          onChange={this.handlePlaylistNameChange}
          placeholder="Playlist Name"
        />
        <TrackList tracks={this.props.playlist} isRemovable={true} onRemove={this.props.onRemove} />
        <div className="playlist-controls">
          <button className="Playlist-save" onClick={this.props.onSave}>
            Save To Spotify
          </button>
          <ClearPlaylist
            resetAllInPlaylist={this.props.resetAllInPlaylist}
            playlistLength={this.props.playlist.length}
          />
        </div>
      </div>
    );
  }
}

function ClearPlaylist({ resetAllInPlaylist, playlistLength }) {
  const [isClicked, setIsClicked] = useState(false);

  const handleSliderClick = () => {
    setIsClicked(true);
    setTimeout(() => resetAllInPlaylist(), 200);
    setTimeout(() => setIsClicked(false), 200);
  };

  return (
    <button
      className={!playlistLength ? "clear-playlist disabled" : "clear-playlist"}
      onClick={handleSliderClick}
      disabled={!playlistLength}
    >
      <div>Clear All</div>
      <div className="slider">
        <div className={isClicked ? "slider-thumb animate-thumb" : "slider-thumb"}></div>
      </div>
    </button>
  );
}

export default Playlist;
