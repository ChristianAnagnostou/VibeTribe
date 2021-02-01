import React, { useEffect, useState } from "react";
// Util
import Spotify from "../../util/Spotify";
// Components
import AccountInfo from "./AccountInfo";
// Styles
import styled from "styled-components";

const SignInTab = ({
  addTrack,
  updatePlaylistName,
  playlistName,
  emptyPlaylist,
  setPlaylistID,
}) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const handleSignIn = () => {
    Spotify.getAccessToken();
  };

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const userResponse = await Spotify.getUserInfo();
        // console.log(userResponse);

        setIsSignedIn(true);
        setUserInfo(userResponse);
      } catch (e) {
        console.log(e);
      }
    };

    if (window.location.href.match(/access_token=([^&]*)/)) {
      getUserInfo();
    }
  }, []);

  const setUserInfoPlaylistsState = async () => {
    const updatedUserOwnedPlaylists = await Spotify.getUserOwnedPlaylists();

    setUserInfo({ ...userInfo, userOwnedPlaylists: updatedUserOwnedPlaylists });
  };

  if (isSignedIn) {
    return (
      <AccountInfo
        userInfo={userInfo}
        setUserInfoPlaylistsState={setUserInfoPlaylistsState}
        addTrack={addTrack}
        updatePlaylistName={updatePlaylistName}
        playlistName={playlistName}
        emptyPlaylist={emptyPlaylist}
        setPlaylistID={setPlaylistID}
      />
    );
  } else {
    return (
      <SpotifySignIn onClick={handleSignIn}>
        <p className="sign-in-text">Connect with Spotify</p>
      </SpotifySignIn>
    );
  }
};

export default SignInTab;

const SpotifySignIn = styled.button`
  /* User is NOT signed in */
  padding: 0.75rem;
  border-radius: 3px;
  text-align: center;
  font-size: 0.9rem;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  transition: all 0.25s;
  border: 1px solid white;
  color: white;
  background: transparent;

  &:hover {
    background-color: rgb(69, 123, 157);
  }

  .sign-in-text {
    letter-spacing: 1px;
  }
`;
