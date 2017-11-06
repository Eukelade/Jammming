import React from 'react';
//import logo from '../../logo.svg';
import './App.css';
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import Playlist from '../Playlist/Playlist.js';
import Spotify from '..//..//util/Spotify.js';

class App extends React.Component {
  constructor(props){
    super(props);
/*
    this.state = { searchResults :[ {id:'08td7MxkoHQkXnWAYD8d6Q', name: 'Song 1', artist: 'Artist 1', album: 'Album 1',uri:'987'},
                                    {id:'1002', name: 'Song 2', artist: 'Artist 1', album: 'Album 1', uri:'987'},
                                    {id:'1003', name: 'Song 3', artist: 'Artist 1', album: 'Album 1', uri:'986'},
                                    {id:'1004', name: 'Song 4', artist: 'Artist 2', album: 'Album 1', uri:'985'},
                                    {id:'1005', name: 'Song 5', artist: 'Artist 1', album: 'Album 1', uri:'984'},
                                    {id:'1006', name: 'Song 6', artist: 'Artist 1', album: 'Album 1', uri:'983'},
                                    {id:'1007', name: 'Song 7', artist: 'Artist 7', album: 'Album 1', uri:'982'},
                                    {id:'1008', name: 'Song 8', artist: 'Artist 1', album: 'Album 1', uri:'981'}],
                    playlistName : 'PlayME',
                    playlistTracks : [
                      { id: '2001', name: 'Track1 Playlist', artist:'Artist1 Playlist', album: 'Album1 Playlist', uri:'887'},
                      { id: '2002', name: 'Track2 Playlist', artist:'Artist2 Playlist', album: 'Album2 Playlist', uri:'886'},
                      { id: '2003', name: 'Track3 Playlist', artist:'Artist3 Playlist', album: 'Album3 Playlist', uri:'889'}
                    ]
                  }
     */
     this.state = { searchResults : [],
                    playlistName: 'New Playlist',
                    playlistTracks : []
                   }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

addTrack(track) {
  if(this.state.playlistTracks.indexOf(track) === -1) {
    this.state.playlistTracks.push(track);
    this.setState({ playlistTracks: this.state.playlistTracks });
  }
}

removeTrack(track){
  this.state.playlistTracks.splice(this.state.playlistTracks.indexOf(track),1);
  this.setState({ playlistTracks: this.state.playlistTracks });
}

updatePlaylistName(name){
  this.setState({playlistName : name});
}

savePlaylist(){
  let trackURIs = [];
  const lenght = this.state.playlistTracks.length;
  for(let i = 0; i < lenght ; i++){
    trackURIs[i] = this.state.playlistTracks[i].uri;
  }
  Spotify.savePlaylist(this.state.playlistName,this.state.playlistTracks);

}

search(term){
  Spotify.search(term).then(playlist => {
    this.setState({searchResults : playlist })
  });
}

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
         <div className="App">
           <SearchBar onSearch={this.search} />
         <div className="App-playlist">
           <SearchResults  searchResults={this.state.searchResults}
                           onAdd={this.addTrack}/>
           <Playlist playlistName={this.state.playlistName}
                     playlistTracks={this.state.playlistTracks}
                     onRemove={this.removeTrack}
                     onNameChange={this.updatePlaylistName}
                     onSave={this.savePlaylist} />
    </div>
  </div>
</div>
    );
  }
}

export default App;
