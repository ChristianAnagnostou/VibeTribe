import React from 'react';
import './App.css';
import {SearchBar} from '../SearchBar/SearchBar';
import {SearchResults} from '../SearchResults/SearchResults';
import {Playlist} from '../Playlist/Playlist';

export class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      playlistName: 'New Playlist',
      searchResults: [
        {name: 'Rockstar', artist: 'Postie', album: 'Rockstar Album', id: '1'},
        {name: 'PopStar', artist: 'Postie', album: 'Rockstar Album', id: '2'},
        {name: 'SockStar', artist: 'Postie', album: 'Rockstar Album', id: '3'},
        {name: 'LockStar', artist: 'Postie', album: 'Rockstar Album', id: '4'},
      ],
      playlist: [
        {name: 'Jessie', artist: 'RockBone', album: 'Terrible Songs', id: '5'},
        {name: 'Bessie', artist: 'RockBone', album: 'Terrible Songs', id: '6'},
        {name: 'Lessie', artist: 'RockBone', album: 'Terrible Songs', id: '7'},
        {name: 'Tessie', artist: 'RockBone', album: 'Terrible Songs', id: '8'},
        {name: 'Gessie', artist: 'RockBone', album: 'Terrible Songs', id: '9'},
      ]
    }
  }

  addTrack = (track) => {
    if(this.state.playlist.find(savedTrack => savedTrack.id === track.id)){
      return;
    } else {
      this.setState(prevState => ({
        playlist: [...prevState.playlist, track]
      }));
    }
  }

  removeTrack = (track) => {
    const playlistToEdit = [...this.state.playlist];
    const trackToRemove = this.state.playlist.find(savedTrack => savedTrack.id === track.id);
    const index = playlistToEdit.indexOf(trackToRemove);
    playlistToEdit.splice(index, 1);
    this.setState({playlist: playlistToEdit});
  }

  updatePlaylistName = (newName) => {
    this.setState({playlistName: newName}, () => {
      console.log(this.state.playlistName)
    })
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults 
              searchResults={this.state.searchResults} 
              onAdd={this.addTrack} 
            />
            <Playlist 
              playlist={this.state.playlist} 
              playlistName={this.state.playlistName} 
              onRemove={this.removeTrack} 
              updatePlaylistName={this.updatePlaylistName}
            />
          </div>
        </div>
      </div>
    );
  }
}
