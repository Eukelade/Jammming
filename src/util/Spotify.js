const clientID = 'dde6a08af9ae44ae9fcf3453ba6cad94';
const authUrl = 'https://accounts.spotify.com/authorize';
const apiUrl = 'https://api.spotify.com/v1';
const uri = 'http://localhost:3000';
let accessToken;
let expiresAt;
let userID;
let playlistID;

const Spotify = {
    getAccessToken(){
        const url = `${authUrl}?client_id=${clientID}&scope=playlist-modify-public&redirect_uri=${uri}&response_type=token&state=159753`;
        if (expiresAt && Date.now() > expiresAt){
           return accessToken;
        }
       if(!accessToken) {
           if(window.location.hash.includes('#access_token')){
               accessToken = window.location.hash.match(/(#access_token=)(.*?)(&)/)[2];
               const expiresIn = window.location.hash.match(/(expires_in=)(.*?)(&)/)[2];
               const timeCreated = Date.now();
               expiresAt = timeCreated + (expiresIn * 1000);
               //window.history.pushState('Access token', null, '/');
           }
           else {
            window.location.href = url;
           }
       }
       return accessToken;
    },

    getAuthorization() {
        const getAuthorization = {
            Authorization : `Bearer ${this.getAccessToken()}`
        };
        return getAuthorization;
    },

    getUserID(){
        const urlToUserID = `${apiUrl}/me`;
        return (fetch (urlToUserID, {
            headers: this.getAuthorization(),
        }).then(response => {
            if(response.ok){
                return response.json();
            }
            throw new Error('No response: geting userID');
        }, networkError => console.log(networkError.message)).then(jsonResponse => {
            if(jsonResponse.id) {
                userID = jsonResponse.id;
                console.log(userID);
                return jsonResponse.id;
            };
            throw new Error('Spotify ID issue');
        }, networkError => console.log(networkError.message)));
    },

    createPlaylist(playlistName){
        const newPlaylistUrl =`${apiUrl}/users/${userID}/playlists`;
        return fetch(newPlaylistUrl, {
            method: 'POST',
            headers: this.getAuthorization(),
            body: JSON.stringify({name: playlistName})
        }).then(response => {
            console.log(response);
            if (response.ok){
                return response.json();
            }
            throw new Error('No playlist ID');
        }, networkError => console.log(networkError.message)).then(jsonResponse => {
            if(jsonResponse.id) {
                playlistID = jsonResponse.id;
                console.log(playlistID);
                return jsonResponse.id;
            }
            throw new Error('Playlist ID jsonResolve error');
        }, networkError => console.log(networkError.message));
    },

    savePlaylist(playlistName, trackUri){
        if(playlistName && trackUri){
           this.getUserID();
           this.createPlaylist(playlistName);

           const uriList = trackUri.map(track => track.uri);
           const url = `${apiUrl}/users/${userID}/playlists/${playlistID}/tracks`;
           return fetch(url, {
                method: 'POST',
                headers: this.getAuthorization(),
                body: JSON.stringify({uris: uriList})
            }).then(response => {
                if(response.ok){
                    return response.json();
                }
                throw new Error('Unable to save tracks to playlist!');
            }, networkError => console.log(networkError.message));
        }
    },

    search(term){
        const url = `${apiUrl}/search?type=track&q=${term}`;
       return fetch(url, {
           headers: this.getAuthorization()
       }).then(response => {
            if(response.ok){
                return response.json();
            }
            throw new Error('No first response');
        }, networkError => console.log(networkError.message)).then(jsonResponse => {
            if(jsonResponse.tracks) {
                return jsonResponse.tracks.items.map(track => ({
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri
                }) );
            }
            //throw new Error(`Are there any tracks? ${jsonResponse.statusText}`);
        });
    }
}

export default Spotify;
