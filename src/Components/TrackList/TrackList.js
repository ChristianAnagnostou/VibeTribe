import React from 'react';
import './TrackList.css';
import {Track} from '../Track/Track';

export class TrackList extends React.Component {
    createTrack = () => {
        return this.props.tracks.map( (track) => {
            return <Track 
                key={track.id} 
                name={track.name} 
                artist={track.artist} 
                album={track.album} 
                id={track.id} 
                isRemovable={this.props.isRemovable} 
                addTrack={this.props.onAdd} 
                removeTrack={this.props.onRemove}
            />
        });
    }

    render() {
        return (
            <div className="TrackList">
                <ul>{this.createTrack()}</ul>
            </div>
        );
    }
}