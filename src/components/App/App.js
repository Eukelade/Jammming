import React from 'react';
//import logo from '../../logo.svg';
import './App.css';
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import Playlist from '../Playlist/Playlist.js';

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = { searchResults :[ {id:'08td7MxkoHQkXnWAYD8d6Q', name: 'Song 1', artist: 'Artist 1', album: 'Album 1'},
                                    {id:'1002', name: 'Song 2', artist: 'Artist 1', album: 'Album 1'},
                                    {id:'1003', name: 'Song 3', artist: 'Artist 1', album: 'Album 1'},
                                    {id:'1004', name: 'Song 4', artist: 'Artist 2', album: 'Album 1'},
                                    {id:'1005', name: 'Song 5', artist: 'Artist 1', album: 'Album 1'},
                                    {id:'1006', name: 'Song 6', artist: 'Artist 1', album: 'Album 1'},
                                    {id:'1007', name: 'Song 7', artist: 'Artist 7', album: 'Album 1'},
                                    {id:'1008', name: 'Song 8', artist: 'Artist 1', album: 'Album 1'}],
                    playlistName : 'PlayME',
                    playlistTracks : [
                      { id: '2001', name: 'Track1 Playlist', artist:'Artist1 Playlist', album: 'Album1 Playlist' },
                      { id: '2002', name: 'Track2 Playlist', artist:'Artist2 Playlist', album: 'Album2 Playlist' },
                      { id: '2003', name: 'Track3 Playlist', artist:'Artist3 Playlist', album: 'Album3 Playlist' }
                    ]
                    }

    //this.addTrack = this.addTrack.bind(this);
  }

addTrack(track){
  console.log(track);
  if(this.state.playlistTracks.id !== track.id){
    this.setState({playlistTracks : track});
    console.log(this.state.playlistTracks);
  }
}


  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
         <div className="App">
           <SearchBar />
         <div className="App-playlist">
           <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack.bind(this)}/>
           <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} />
    </div>
  </div>
</div>
    );
  }
}

export default App;