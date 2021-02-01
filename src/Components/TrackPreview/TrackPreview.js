import React, { useState, useEffect } from "react"; // Icons
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
// Styles
import styled from "styled-components";

const TrackPreview = ({
  previewUrl,
  trackId,
  handleSongChange,
  currentSongPlaying,
  resetAllSongs,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const renderPreviewSrc = () => {
    return String(previewUrl);
  };

  const controlPreview = () => {
    const audioEle = document.getElementById(trackId);

    if (isPlaying) {
      // clicking stop button
      handleSongChange("");
      audioEle.pause();
      audioEle.load();
      setIsPlaying(false);
    } else {
      //if switching from another playing song
      if (currentSongPlaying !== trackId) {
        resetAllSongs();
      }

      //clicking the play button
      audioEle.play();
      handleSongChange(trackId);
      setIsPlaying(true);
      //check if the track ended on its own
      let checkForEnding = setInterval(() => {
        if (audioEle.ended) {
          handleSongChange("");

          clearInterval(checkForEnding);
          setIsPlaying(false);
        }
      }, 100);
    }
  };

  //set isPlaying to false if the song is paused from TrackList
  useEffect(() => {
    const audioEle = document.getElementById(trackId);
    if (audioEle !== null) {
      if (isPlaying & audioEle.paused) {
        setIsPlaying(false);
      }
    }
  }, [isPlaying, trackId]);

  if (previewUrl) {
    return (
      <PreviewButton>
        <audio id={trackId}>
          <source src={renderPreviewSrc()} type="audio/mpeg" />
        </audio>
        {currentSongPlaying === trackId ? (
          <span className="audioControl" onClick={controlPreview}>
            <span className="progressCircle"></span>
            <HighlightOffIcon className="previewIcon pause" style={{ fontSize: 35 }} />
          </span>
        ) : (
          <span className="audioControl" onClick={controlPreview}>
            <PlayCircleOutlineIcon className="previewIcon play" style={{ fontSize: 35 }} />
          </span>
        )}
      </PreviewButton>
    );
  } else {
    return <></>;
  }
};
export default TrackPreview;

const PreviewButton = styled.div`
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.15) !important;
  }

  .audioControl {
    color: rgb(29, 53, 87);
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6px;
    position: relative;
    height: 35px;
    width: 35px;
    transition: all 0.2s ease;
  }

  .pause {
    position: absolute;
  }

  .progressCircle {
    position: absolute;
    display: inline-block;
    height: 28px;
    width: 28px;
    border-radius: 50%;
    background: conic-gradient(transparent 50%, white);
    animation: 30s linear 0s 1 spinner;
  }

  @-webkit-keyframes spinner {
    to {
      transform: rotate(1turn);
    }
  }

  @keyframes spinner {
    to {
      transform: rotate(1turn);
    }
  }
`;
