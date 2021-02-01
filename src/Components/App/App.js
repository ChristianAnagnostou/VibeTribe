import React, { useState, useEffect } from "react";
// Components
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import SignInTab from "../SignInTab/SignInTab";
import Spotify from "../../util/Spotify";
// Styles
import styled from "styled-components";
// Icon
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";

const App = () => {
  const [playlistName, setPlaylistName] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [playlistID, setPlaylistID] = useState(null);
  const [activeTab, setActiveTab] = useState("results");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const setPlaylistIDFunction = (uri) => {
    setPlaylistID(uri);
  };

  const emptyPlaylist = () => {
    setPlaylist([]);
  };

  const updatePlaylistName = (newName) => {
    setPlaylistName(newName);
  };

  const resetAllInPlaylist = () => {
    setPlaylistName("");
    setPlaylist([]);
    setPlaylistID(null);
  };

  const addTrack = (newTrack) => {
    if (playlist.find((savedTrack) => savedTrack.id === newTrack.id)) {
      return;
    } else {
      setPlaylist((prevState) => [...prevState, newTrack]);
    }
  };

  const removeTrack = (track) => {
    const filtered = playlist.filter((savedTrack) => savedTrack.id !== track.id);
    setPlaylist([...filtered]);
  };

  const savePlaylist = async () => {
    const trackURIs = playlist.map((track) => track.uri);
    await Spotify.savePlaylist(playlistName, trackURIs, playlistID);
    resetAllInPlaylist();
  };

  const search = async (term) => {
    console.log(`searching spotify for ${term}`);
    let tracksArr = await Spotify.search(term);
    setSearchResults(tracksArr);
  };

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
            <span>Vibe</span>Tribe
          </h1>
          <SignInTab
            addTrack={addTrack}
            updatePlaylistName={updatePlaylistName}
            playlistName={playlistName}
            emptyPlaylist={emptyPlaylist}
            setPlaylistID={setPlaylistIDFunction}
          />
        </div>
        <SearchBar onSearch={search} />
      </header>
      <main>
        <div className="App-inner-container">
          <nav className="nav">
            <h1 onClick={() => handleTabClick("results")}>Results</h1>
            <h1 onClick={() => handleTabClick("playlist")}>Playlist</h1>
          </nav>
          <div className="App-playlist">
            {activeTab === "results" ? (
              <SearchResults searchResults={searchResults} onAdd={addTrack} />
            ) : (
              <Playlist
                playlist={playlist}
                playlistName={playlistName}
                updatePlaylistName={updatePlaylistName}
                onRemove={removeTrack}
                onSave={savePlaylist}
                resetAllInPlaylist={resetAllInPlaylist}
              />
            )}
          </div>
        </div>
      </main>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  width: 100%;
  /* ::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  } */

  header {
    background: rgb(29, 53, 87);
    color: rgb(241, 250, 238);
    padding: 1rem 2rem;
    height: 35vh;
    .logo {
      font-size: 2rem;
      font-weight: 400;
      span {
        font-weight: 800;
      }
    }
  }

  main {
    min-height: 65vh;
    overflow-x: hidden;
    width: 100%;
    background: rgb(69, 123, 157);

    font-family: "Work Sans", sans-serif;
    color: #fff;
    display: grid;
    justify-content: fill;
    grid-template-rows: 1fr;

    .App-inner-container {
      position: relative;
      border-radius: 5px;
      nav {
        background: rgb(241, 250, 238);
        color: rgb(29, 53, 87);
        display: flex;
        height: 2.5rem;

        h1 {
          height: 100%;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          border-bottom: 1px solid rgb(221, 221, 221);

          &:hover {
            background: rgb(236, 236, 236);
          }
          &:first-child {
            border-right: 1px solid rgb(221, 221, 221);
          }
        }
      }
    }

    .App-playlist {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }
  }

  @media only screen and (max-width: 1020px) {
    .App-playlist {
      align-items: center;
      flex-direction: column;
    }
  }
`;

export default App;
