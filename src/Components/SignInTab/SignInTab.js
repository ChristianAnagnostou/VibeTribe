import React, { useEffect } from "react";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../redux/actions/userActions";
// Util
import Spotify from "../../util/Spotify";
// Components
import AccountInfo from "./AccountInfo";
// Styles
import styled from "styled-components";

const SignInTab = () => {
  // Redux
  const dispatch = useDispatch();
  const { loggedIn } = useSelector((state) => state.user);

  const handleSignIn = () => {
    Spotify.getAccessToken();
  };

  useEffect(() => {
    if (window.location.href.match(/access_token=([^&]*)/)) {
      dispatch(userLogin());
    }
  }, [dispatch]);

  if (loggedIn) {
    return <AccountInfo />;
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
