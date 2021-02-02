import React, { useState, useEffect } from "react";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { importPlaylist } from "../../redux/actions/playlistActions";
// Styles
import styled from "styled-components";
import { changeTab, getUserPlaylists } from "../../redux/actions/userActions";

const AccountInfo = () => {
  // Redux
  const user = useSelector((state) => state.user);
  // Local State
  const [tabActive, setTabActive] = useState(false);

  const toggleTab = () => {
    setTabActive(!tabActive);
  };

  return (
    <AccountInfoContainer>
      <div className="user-image" onClick={toggleTab}>
        <img src={user.images[0].url} alt="User" className="user-image" />
      </div>
      {tabActive && (
        <ActiveTab userName={user.display_name} userOwnedPlaylists={user.userOwnedPlaylists} />
      )}
    </AccountInfoContainer>
  );
};

const ActiveTab = ({ userName, userOwnedPlaylists }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("updating");
    dispatch(getUserPlaylists(userName));
  }, [dispatch, userName]);

  const handlePlaylistClick = (playlistId, playlistName) => {
    dispatch(importPlaylist(playlistId, playlistName));
    dispatch(changeTab("playlist"));
  };

  return (
    <AccountInfoTab>
      <p className="account-info-username">{userName}</p>
      <p className="import-playlist-title">Import playlist</p>
      <div className="user-playlists-container">
        <div>
          {userOwnedPlaylists.map((playlist) => {
            return (
              <p
                key={playlist.id}
                onClick={() => handlePlaylistClick(playlist.id, playlist.name)}
                className={"user-playlist"}
              >
                {playlist.name}
              </p>
            );
          })}
        </div>
      </div>
    </AccountInfoTab>
  );
};

export default AccountInfo;

const AccountInfoContainer = styled.div`
  position: relative;
  color: white;
  background: transparent;
  padding: 0.5rem;
  border-radius: 3px;

  font-size: 0.8rem;
  transition: all 0.2s ease-in-out;
  display: flex;
  flex-direction: row-reverse;

  .user-image {
    align-self: flex-start;
    img {
      cursor: pointer;
      height: 35px;
      width: 35px;
      border: 2px solid white;
      border-radius: 50%;
      transition: all 0.2s ease-in;
    }
  }
`;

const AccountInfoTab = styled.div`
  position: absolute;
  top: 0;
  right: 100%;
  .account-info-username {
    margin-bottom: 15px;
    color: white;
    font-size: 1.1rem;
  }
  .import-playlist-title {
    color: white;
    font-weight: bold;
    font-size: 0.9rem;
    padding-bottom: 3px;
    margin-bottom: 5px;
    width: fit-content;
  }
  .user-playlists-container {
    width: 131%;
  }
  .user-playlist {
    padding: 0.25rem 3px;
    width: 100%;
    background: transparent;
    border-radius: 3px;
    cursor: pointer;
    margin: 2px 0;
    transition: all 0.25s ease-in-out;

    &:not(:last-child) {
      border-bottom: 1px solid white;
    }
    &:hover {
      background: rgb(69, 123, 157);
    }
  }
`;
