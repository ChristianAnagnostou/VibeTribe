import React from "react";
import "./Track.css";
import { TrackPreview } from "../TrackPreview/TrackPreview";

export class Track extends React.Component {
  handleTrackAction = () => {
    if (this.props.isRemovable) {
      this.props.removeTrack({ id: this.props.id });
    } else {
      this.props.addTrack({
        name: this.props.name,
        artist: this.props.artist,
        album: this.props.album,
        id: this.props.id,
        uri: this.props.uri,
      });
    }
  };

  renderAction() {
    return (
      <button className="Track-action" onClick={this.handleTrackAction}>
        {this.props.isRemovable ? "-" : "+"}
      </button>
    );
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.name}</h3>
          <p>
            {this.props.artist} | {this.props.album}
          </p>
        </div>
        <TrackPreview
          previewUrl={this.props.previewUrl}
          trackId={this.props.id}
          handleSongChange={this.props.handleSongChange}
          currentSongPlaying={this.props.currentSongPlaying}
          resetAllSongs={this.props.resetAllSongs}
        />
        <span>{this.renderAction()}</span>
      </div>
    );
  }
}
