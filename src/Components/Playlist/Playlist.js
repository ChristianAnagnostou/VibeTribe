import React from 'react';
import './Playlist.css'
import {TrackList} from '../TrackList/TrackList';

export class Playlist extends React.Component {
    handlePlaylistNameChange = (e) => {
        this.props.updatePlaylistName(e.target.value);
    }

    render() {
        return (
        <div className="Playlist" >
            <input value={this.props.playlistName} onChange={this.handlePlaylistNameChange}/>
            <TrackList 
                tracks={this.props.playlist} 
                isRemovable={true}
                onRemove={this.props.onRemove}
            />
            <button className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
        </div>
        );
    }
}