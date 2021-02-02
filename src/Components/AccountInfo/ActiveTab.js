import React, { useEffect } from "react";
// Redux
import { useDispatch } from "react-redux";
import { importPlaylist } from "../../redux/actions/playlistActions";
// Styles
import styled from "styled-components";
import { changeTab, getUserPlaylists } from "../../redux/actions/userActions";

const ActiveTab = ({ userName, playlists }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserPlaylists(userName));
  }, [dispatch, userName]);

  const handlePlaylistClick = (playlistId, playlistName) => {
    dispatch(importPlaylist(playlistId, playlistName));
    dispatch(changeTab("playlist"));
  };

  return (
    <ActiveTabContainer>
      <p className="username">{userName}</p>
      <p className="title">Your playlists</p>
      <div className="playlists-container">
        <div>
          {playlists.map((playlist) => {
            return (
              <p
                key={playlist.id}
                onClick={() => handlePlaylistClick(playlist.id, playlist.name)}
                className={"playlist"}
              >
                {playlist.name}
              </p>
            );
          })}
        </div>
      </div>
    </ActiveTabContainer>
  );
};

export default ActiveTab;

const ActiveTabContainer = styled.div`
  background: rgb(168, 218, 220);
  color: #444;
  position: absolute;
  top: 100%;
  right: 0;
  padding: 1rem;
  border-radius: 4px;
  width: 250px;
  z-index: 99;
  .username {
    margin-bottom: 15px;
    font-size: 1.1rem;
  }

  .title {
    font-weight: 100;
    font-size: 0.8rem;
    margin-bottom: 10px;
  }

  .playlist {
    background: transparent;
    border-radius: 3px;
    cursor: pointer;
    padding: 4px 0;
    transition: all 0.25s ease-in-out;
    font-size: 0.9rem;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    &:not(:last-child) {
      border-bottom: 1px solid white;
    }
    &:hover {
      background: rgb(69, 123, 157);
      color: white;
    }
  }
`;
