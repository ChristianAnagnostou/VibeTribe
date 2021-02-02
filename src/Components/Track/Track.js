import React from "react";
// Redux
import { useDispatch } from "react-redux";
import { addTrack, removeTrack } from "../../redux/actions/playlistActions";
// Components
import TrackPreview from "../TrackPreview/TrackPreview";
// Styles
import styled from "styled-components";

const Track = ({ track, isRemovable, handleSongChange, currentSongPlaying, resetAllSongs }) => {
  const dispatch = useDispatch();

  const handleTrackAction = () => {
    if (isRemovable) {
      dispatch(removeTrack(track));
    } else {
      dispatch(addTrack(track));
    }
  };

  const renderAction = () => {
    return (
      <AddButton onClick={handleTrackAction}>
        <p>{isRemovable ? "Remove" : "Add"}</p>
        <button className="icon">{isRemovable ? "-" : "+"}</button>
      </AddButton>
    );
  };

  return (
    <TrackContainer>
      <div className="image-wrap">
        <img src={track.album.images[1].url} alt="" />
        <TrackPreview
          previewUrl={track.preview_url}
          trackId={track.id}
          handleSongChange={handleSongChange}
          currentSongPlaying={currentSongPlaying}
          resetAllSongs={resetAllSongs}
        />
      </div>
      <TrackInformation>
        <h3>{track.name}</h3>
        <p>
          {track.artists[0].name} | {track.album.name}
        </p>
      </TrackInformation>
      <span>{renderAction()}</span>
    </TrackContainer>
  );
};
export default Track;

const TrackContainer = styled.li`
  box-shadow: 0 2px 7px #535353;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 300px;
  padding: 0.5rem 0;
  background: rgb(241, 250, 238);
  border-radius: 3px;

  &:hover .audioControl {
    color: rgb(168, 218, 220);
    transform: scale(1.25);
  }

  .image-wrap {
    filter: grayscale(20%);
    position: relative;
    box-shadow: 0 0 10px grey;
    transition: all 0.2s ease;
    img {
      margin-bottom: -5px;
      height: 150px;
      width: 150px;
      object-fit: cover;
    }
  }
`;

const TrackInformation = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: black;
  padding: 0 0.5rem;

  h3 {
    margin-bottom: 0.5rem;
    font-size: 1.15rem;
  }

  p {
    font-size: 0.75rem;
    font-weight: 300;
  }
`;

const AddButton = styled.div`
  display: flex;
  align-items: center;
  border-radius: 50px;
  background: rgb(168, 218, 220);
  box-shadow: 0 1px 3px grey;
  color: white;
  padding: 0 0.5rem;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    background: rgb(69, 123, 157);
  }
  p {
    font-weight: 100;
  }
  .icon {
    font-size: 1.3rem;
    transition: color 0.25s;
    border: 0px;
    background-color: rgba(0, 0, 0, 0);
    color: white;
    outline: none;
  }
`;
