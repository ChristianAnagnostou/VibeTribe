import React from "react";
import "./TrackList.css";
import { Track } from "../Track/Track";

export class TrackList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentSongPlaying: "" };
  }

  handleSongChange = (params) => {
    this.setState({ currentSongPlaying: params });
  };

  resetAllSongs = () => {
    const audioEles = document.getElementsByTagName("audio");
    for (let i = 0; i < audioEles.length; i++) {
      audioEles[i].pause();
      audioEles[i].load();
    }
  };

  createTrack = () => {
    return this.props.tracks.map((track) => {
      return (
        <Track
          key={track.id}
          name={track.name}
          artist={track.artist}
          album={track.album}
          id={track.id}
          uri={track.uri}
          previewUrl={track.previewUrl}
          isRemovable={this.props.isRemovable}
          addTrack={this.props.onAdd}
          removeTrack={this.props.onRemove}
          handleSongChange={this.handleSongChange}
          currentSongPlaying={this.state.currentSongPlaying}
          resetAllSongs={this.resetAllSongs}
        />
      );
    });
  };

  render() {
    return (
      <div className="TrackList">
        <ul>{this.createTrack()}</ul>
      </div>
    );
  }
}
