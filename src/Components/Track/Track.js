import React from 'react';
import './Track.css';

export class Track extends React.Component {
    handleTrackAction = () => {
        if(this.props.isRemovable) {
            this.props.removeTrack({id: this.props.id});
        } else {
            this.props.addTrack(
                {name: this.props.name, artist: this.props.artist, album: this.props.album, id: this.props.id, uri: this.props.uri}
            );
        }
    }

    renderAction(){
        return <button className="Track-action" onClick={this.handleTrackAction}>{this.props.isRemovable ? '-' : '+'}</button>
    }

    handleDragStart = (e) => {
        this.props.onDragStart(e, this.props.id);
    }

    handleTrackDrop = (e) => {
        e.preventDefault();
        this.props.onDrop(e);
    }
    
    handleDragOver = (e) => {
        const isOverPlaylist = document.querySelector('.Playlist').onmouseover = () => true;
        if(isOverPlaylist){
            e.preventDefault();
        } else {
            e.stopPropagation();
        }
    }

    render() {
        return (
            <div className="Track" 
                draggable={this.props.isDraggable} 
                onDragStart={this.handleDragStart} 
                onDragOver={this.handleDragOver} 
                onDrop={this.handleTrackDrop}
            >
                <div className="Track-information">
                    <h3>{this.props.name}</h3>
                    <p>{this.props.artist} | {this.props.album}</p>
                </div>
                <span>{this.renderAction()}</span>
            </div>
        );
    }
}