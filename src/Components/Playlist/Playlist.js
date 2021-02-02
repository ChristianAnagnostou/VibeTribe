import React, { useState, useEffect } from "react";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { clearPlaylist, savePlaylist } from "../../redux/actions/playlistActions";
// Components
import { MemoizedTrackList } from "../TrackList/TrackList";
// Styles
import styled from "styled-components";

const Playlist = () => {
  // Redux
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { playlistTracks, playlistName, playlistID } = useSelector((state) => state.playlist);

  const [currPlaylistName, setCurrPlaylistName] = useState(playlistName);

  // Update playlist name when importing playlists
  useEffect(() => {
    setCurrPlaylistName(playlistName);
  }, [playlistName]);

  const handlePlaylistNameChange = ({ target }) => {
    setCurrPlaylistName(target.value);
  };

  const handleClear = () => {
    dispatch(clearPlaylist());
  };

  const handleSave = () => {
    dispatch(savePlaylist(playlistTracks, currPlaylistName, playlistID, user.id));
    setCurrPlaylistName("");
  };

  return (
    <PlaylistContainer>
      <div className="playlist-header">
        <div className="playlist-input">
          <label htmlFor="playlistName">Title:</label>
          <input
            name="playlistName"
            type="text"
            value={currPlaylistName}
            onChange={handlePlaylistNameChange}
            placeholder="Playlist Name"
          />
        </div>
        <div className="playlist-controls">
          <Btn onClick={handleSave}>Save To Spotify</Btn>
          <Btn onClick={handleClear}>Clear</Btn>
        </div>
      </div>
      <MemoizedTrackList tracks={playlistTracks} isRemovable={true} />
    </PlaylistContainer>
  );
};

export default Playlist;

const PlaylistContainer = styled.div`
  margin: 1rem;
  .playlist-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .playlist-input {
      display: flex;
      align-items: center;
      label {
        color: white;
        font-size: 1.5rem;
        margin-right: 0.5rem;
      }
      input {
        width: 100%;
        max-width: 230px;
        margin: 1rem 0;
        padding: 0.25rem;
        background: rgb(241, 250, 238);
        font-family: Lato, sans-serif;
        font-size: 1.1rem;
        border: 1px solid #f3f3f5;
        border-radius: 4px;
        transition: background-color 0.2s ease;

        &:focus {
          outline: none;
        }
      }
    }
    .playlist-controls {
      margin-left: 1rem;
    }
  }
  @media (max-width: 500px) {
    .playlist-header {
      flex-direction: column;
      margin-bottom: 0.75rem;
    }
  }
`;

const Btn = styled.button`
  cursor: pointer;
  width: 8.11rem;
  padding: 0.77rem 0;
  border-radius: 54px;
  background-color: rgb(29, 53, 87);
  color: white;
  text-align: center;
  font-size: 0.8rem;
  font-weight: 500;
  border: none;
  transition: all 0.25s;
  &:first-child {
    margin-right: 1rem;
  }
  &:hover {
    color: rgb(59, 59, 59);
    background-color: rgb(168, 218, 220);
  }
`;
