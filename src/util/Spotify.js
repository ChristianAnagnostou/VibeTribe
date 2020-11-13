const clientID = '053f2e85785e496ab82d9b0f6b8d29e6';
const redirectURI = 'http://localhost:3000/'
let accessToken;

export const Spotify = {
    getAccessToken() {
        console.log(accessToken)
        if (accessToken) {
            return accessToken;
        }
        // check for access token match
        const parsedAccessToken = window.location.href.match(/access_token=([^&]*)/);
        const parsedExpiresIn = window.location.href.match(/expires_in=([^&]*)/);

        if (parsedAccessToken && parsedExpiresIn) {
            accessToken = parsedAccessToken[1];
            const expiresIn = Number(parsedExpiresIn[1])

            // clear the parameters, allowing us to grab a new access token when it expires
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`
        }
    },

    async search(term) {
        const accessToken = Spotify.getAccessToken();
        try {
            const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            const jsonResponse = await response.json();
            const tracks = jsonResponse.tracks;
            if (!tracks) {
                return [];
            }
            const tracksArr = tracks.items.map((track) => {
                return {
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri,
                }
            })
            return tracksArr;
        } catch (e) {
            console.log(e);
        }
    },

    async savePlaylist(playlistName, uriArray) {
        if (!playlistName || !uriArray.length || uriArray.length > 100) {
            return;
        }
        const currentAccessToken = accessToken;
        const headers = {
            Authorization: `Bearer ${currentAccessToken}`
        }
        let userID;

        try {
            const response = await fetch('https://api.spotify.com/v1/me', {
                headers: headers
            });
            const jsonResponse = response.json();
            console.log(jsonResponse.display_name, jsonResponse.email)
            userID = jsonResponse.id;
            try {
                const postResponse = await fetch(`https://api.spotify.com/v1/${userID}/playlists`, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({
                        name: playlistName
                    }),
                });
                const jsonPostResponse = await postResponse.json();
                const playlistID = jsonPostResponse.id;
                try {
                    const response = await fetch(`https://api.spotify.com/v1/${userID}/playlists/${playlistID}/tracks`, {
                        headers: headers,
                        method: 'POST',
                        body: JSON.stringify({
                            uris: uriArray
                        })
                    });
                    return response;
                } catch (e) {
                    console.log(e);
                }
            } catch (e) {
                console.log(e);
            }
        } catch (e) {
            console.log(e);
        }
    }
}