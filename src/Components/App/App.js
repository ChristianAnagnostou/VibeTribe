import React from "react";
import "./App.css";
import { SearchBar } from "../SearchBar/SearchBar";
import { SearchResults } from "../SearchResults/SearchResults";
import { Playlist } from "../Playlist/Playlist";
import { SignInTab } from "../SignInTab/SignInTab";
import Spotify from "../../util/Spotify";

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlistName: "",
      searchResults: [],
      playlist: [],
      playlistID: null,
    };
  }

  setPlaylistID = (uri) => {
    this.setState({ playlistID: uri });
  };

  emptyPlaylist = () => {
    this.setState({ playlist: [] });
  };

  updatePlaylistName = (newName) => {
    this.setState({ playlistName: newName });
  };

  resetAllInPlaylist = () => {
    this.setState({
      playlistName: "",
      playlist: [],
      playlistID: null,
    });
  };

  addTrack = (track) => {
    if (this.state.playlist.find((savedTrack) => savedTrack.id === track.id)) {
      return;
    } else {
      this.setState((prevState) => ({
        playlist: [...prevState.playlist, track],
      }));
    }
  };

  removeTrack = (track) => {
    const playlistToEdit = [...this.state.playlist];
    const trackToRemove = this.state.playlist.find((savedTrack) => savedTrack.id === track.id);
    const index = playlistToEdit.indexOf(trackToRemove);
    playlistToEdit.splice(index, 1);
    this.setState({ playlist: playlistToEdit });
  };

  savePlaylist = async () => {
    const trackURIs = this.state.playlist.map((track) => track.uri);
    await Spotify.savePlaylist(this.state.playlistName, trackURIs, this.state.playlistID);
    this.resetAllInPlaylist();
  };

  search = async (term) => {
    console.log(`searching spotify for ${term}`);
    let tracksArr = await Spotify.search(term);
    this.setState({ searchResults: tracksArr });
  };

  componentDidMount() {
    if (localStorage.getItem("userAccessToken")) {
      Spotify.getAccessToken();
    }
  }

  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mm</span>ing
        </h1>
        <div className="App">
          <div className="App-inner-container">
            <SignInTab
              addTrack={this.addTrack}
              updatePlaylistName={this.updatePlaylistName}
              playlistName={this.state.playlistName}
              emptyPlaylist={this.emptyPlaylist}
              setPlaylistID={this.setPlaylistID}
            />
            <SearchBar onSearch={this.search} />
            <div className="App-playlist">
              <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
              <Playlist
                playlist={this.state.playlist}
                playlistName={this.state.playlistName}
                updatePlaylistName={this.updatePlaylistName}
                onRemove={this.removeTrack}
                onSave={this.savePlaylist}
                resetAllInPlaylist={this.resetAllInPlaylist}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
