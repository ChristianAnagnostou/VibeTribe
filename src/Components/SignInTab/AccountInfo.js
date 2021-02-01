import React, { useState, useEffect } from "react";
// Util
import Spotify from "../../util/Spotify";
// import equal from "fast-deep-equal";
// Styles
import styled from "styled-components";

const AccountInfo = ({
  addTrack,
  emptyPlaylist,
  playlistName,
  setPlaylistID,
  setUserInfoPlaylistsState,
  updatePlaylistName,
  userInfo,
}) => {
  const [tabActive, setTabActive] = useState(false);

  useEffect(() => {
    // console.log(userInfo);
    // console.log(playlistName);
    console.log("BUG update playlist name in accouint info");
    // if (!equal(playlistName, prevProps.playlistName)) {
    //   setUserInfoPlaylistsState();
    // }
  }, []);

  const toggleTab = () => {
    setTabActive(!tabActive);
  };

  const importPlaylist = (playlist) => {
    emptyPlaylist();
    updatePlaylistName(playlist.name);
    setPlaylistID(playlist.id);
    Spotify.getPlaylistSongs(playlist.id).then((tracks) => {
      tracks.map((track) => {
        addTrack({
          id: track.track.id,
          name: track.track.name,
          artist: track.track.artists[0].name,
          album: track.track.album.name,
          uri: track.track.uri,
          href: track.track.album.href,
          previewUrl: track.track.preview_url,
          image: track.track.album.images[1].url,
        });
        return null;
      });
    });
  };

  return (
    <AccountInfoContainer>
      <div className="user-image" onClick={toggleTab}>
        {userInfo && <img src={userInfo.userProfileImg} alt="User" className="user-image" />}
      </div>
      {tabActive && (
        <OpenAccountInfo
          userName={userInfo.userName}
          userOwnedPlaylists={userInfo.userOwnedPlaylists}
          importPlaylist={importPlaylist}
        />
      )}
    </AccountInfoContainer>
  );
};
export default AccountInfo;

const OpenAccountInfo = ({ userName, userOwnedPlaylists, importPlaylist }) => {
  return (
    <AccountInfoTab>
      <p className="account-info-username">{userName}</p>
      <div className="user-playlists-container">
        <p className="import-playlist-title">Import playlist</p>
        <div>
          {userOwnedPlaylists.map((playlist) => {
            return (
              <p
                key={playlist.id}
                onClick={() => importPlaylist(playlist)}
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

// User is signed in
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
  border: 1px solid red;
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
