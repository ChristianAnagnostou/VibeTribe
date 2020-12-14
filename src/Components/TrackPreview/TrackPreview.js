import React from "react";
import "./TrackPreview.css";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

export class TrackPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isPlaying: false };
  }

  renderPreviewSrc = () => {
    return String(this.props.previewUrl);
  };

  controlPreview = () => {
    const audioEle = document.getElementById(this.props.trackId);

    if (this.state.isPlaying) {
      // clicking stop button
      this.props.handleSongChange("");
      audioEle.pause();
      audioEle.load();
      this.setState({ isPlaying: false });
    } else {
      //if switching from another playing song
      if (this.props.currentSongPlaying !== this.props.trackId) {
        this.props.resetAllSongs();
      }

      //clicking the play button
      audioEle.play();
      this.props.handleSongChange(this.props.trackId);
      this.setState({ isPlaying: true });
      //check if the track ended on its own
      let checkForEnding = setInterval(() => {
        if (audioEle.ended) {
          this.props.handleSongChange("");

          clearInterval(checkForEnding);
          this.setState({ isPlaying: false });
        }
      }, 100);
    }
  };

  //set isPlaying to false if the song is paused from TrackList
  componentDidUpdate() {
    const audioEle = document.getElementById(this.props.trackId);
    if (audioEle !== null) {
      if (this.state.isPlaying & audioEle.paused) {
        this.setState({ isPlaying: false });
      }
    }
  }

  render() {
    if (this.props.previewUrl) {
      return (
        <span className="Preview-button">
          <audio id={this.props.trackId}>
            <source src={this.renderPreviewSrc()} type="audio/mpeg" />
          </audio>
          {this.props.currentSongPlaying === this.props.trackId ? (
            <span className="audioControl" onClick={this.controlPreview}>
              <span className="progressCircle"></span>
              <HighlightOffIcon className="previewIcon pause" style={{ fontSize: 35 }} />
            </span>
          ) : (
            <span className="audioControl" onClick={this.controlPreview}>
              <PlayCircleOutlineIcon className="previewIcon play" style={{ fontSize: 35 }} />
            </span>
          )}
        </span>
      );
    } else {
      return <span></span>;
    }
  }
}
