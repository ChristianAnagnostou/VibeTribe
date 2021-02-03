import React, { useEffect } from "react";
// Redux
import { useSelector } from "react-redux";
// Components
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import SignInTab from "../SignInTab/SignInTab";
import Spotify from "../../util/Spotify";
// Styles
import styled from "styled-components";
// Icons
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
import Tabs from "../Nav/Tabs";

const App = () => {
  const { currentTab } = useSelector((state) => state.user);

  // check if accessToken exists in local storage on mount
  useEffect(() => {
    const token = localStorage.getItem("userAccessToken");
    if (token) {
      Spotify.getAccessToken();
    }
  }, []);

  return (
    <MainContainer>
      <header>
        <div className="flex-container">
          <h1 className="logo">
            <LibraryMusicIcon style={{ fontSize: "1.4rem" }} />
            VibeTribe
          </h1>
          <SignInTab />
        </div>
        <SearchBar />
      </header>
      <main>
        <Tabs />
        <div className="track-display-container">
          {currentTab === "results" ? <SearchResults /> : <Playlist />}
        </div>
      </main>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  width: 100%;
  font-family: "Work Sans", sans-serif;

  ::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }

  header {
    background: rgb(29, 53, 87);
    color: rgb(241, 250, 238);
    padding: 1rem 2rem;
    min-height: 35vh;
    .logo {
      font-size: 2rem;
      font-weight: 400;
    }
  }

  main {
    overflow-x: hidden;
    width: 100%;
  }

  @media (max-width: 500px) {
    header {
      padding: 1rem 1rem;
      .logo {
        font-size: 1.5rem;
      }
    }
  }
`;

export default App;
