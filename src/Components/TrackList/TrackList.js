import React, { useState } from "react";
// Components
import Track from "../Track/Track";
// Styles
import styled from "styled-components";

const TrackList = (props) => {
  const [currentSongPlaying, setCurrentSongPlaying] = useState("");

  const handleSongChange = (params) => {
    setCurrentSongPlaying(params);
  };

  const resetAllSongs = () => {
    const audioEles = document.getElementsByTagName("audio");
    for (let i = 0; i < audioEles.length; i++) {
      audioEles[i].pause();
      audioEles[i].load();
    }
  };

  const createTrack = () => {
    return props.tracks.map((track) => (
      <Track
        key={track.id}
        track={track}
        isRemovable={props.isRemovable}
        addTrack={props.onAdd}
        removeTrack={props.onRemove}
        handleSongChange={handleSongChange}
        currentSongPlaying={currentSongPlaying}
        resetAllSongs={resetAllSongs}
      />
    ));
  };

  return (
    <TrackListContainer>
      <ul>{createTrack()}</ul>
    </TrackListContainer>
  );
};
export default TrackList;

const TrackListContainer = styled.div`
  width: 100%;
  ul {
    display: grid;
    align-items: center;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    grid-gap: 1rem;
  }
`;
