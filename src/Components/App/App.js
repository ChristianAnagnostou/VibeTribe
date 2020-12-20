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
      playlistName: "New Playlist",
      searchResults: [],
      playlist: [],
    };
  }

  emptyPlaylist = () => {
    this.setState({ playlist: [] });
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

  updatePlaylistName = (newName) => {
    this.setState({ playlistName: newName });
  };

  savePlaylist = async () => {
    console.log(this.state.playlist);
    const playlistURIs = this.state.playlist.map((track) => track.uri);
    await Spotify.savePlaylist(this.state.playlistName, playlistURIs);
    this.setState({
      playlistName: "New Playlist",
      playlist: [],
    });
  };

  search = async (term) => {
    console.log(`searching spotify for ${term}`);
    let tracksArr = await Spotify.search(term);
    this.setState({ searchResults: tracksArr });
  };

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
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
