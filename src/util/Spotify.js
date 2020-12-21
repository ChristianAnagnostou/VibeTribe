const clientID = "053f2e85785e496ab82d9b0f6b8d29e6";
const redirectURI = "http://localhost:3000/"; //only used with "npm start"
// const redirectURI = "http://christians-jams.surge.sh/";
let accessToken;
let userName;
let userProfileImg;
let userOwnedPlaylists;

const Spotify = {
  // Get the users access token
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }
    // check for access token match
    const parsedAccessToken = window.location.href.match(/access_token=([^&]*)/);
    const parsedExpiresIn = window.location.href.match(/expires_in=([^&]*)/);

    if (parsedAccessToken && parsedExpiresIn) {
      accessToken = parsedAccessToken[1];
      const expiresIn = Number(parsedExpiresIn[1]);

      // clear the parameters, allowing us to grab a new access token when it expires
      window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
      window.history.pushState("Access Token", null, "/");
      localStorage.setItem("userAccessToken", accessToken);
      return accessToken;
    } else {
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
    }
  },

  async getUserInfo() {
    if (!accessToken) {
      accessToken = Spotify.getAccessToken();
    }

    if (!userName || !userProfileImg) {
      // fetch userName and userProfileImg
      const userNameAndImg = await this.getUserNameAndImg();
      const { userName, userProfileImg } = userNameAndImg;
      // fetch the user owned playlists
      const userOwnedPlaylists = await this.getUserOwnedPlaylists();
      return { userName, userProfileImg, userOwnedPlaylists };
    }
    return { userName, userProfileImg, userOwnedPlaylists };
  },

  // Get the user name and profile image
  async getUserNameAndImg() {
    try {
      const response = await fetch("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const jsonResponse = await response.json();
      userName = jsonResponse.display_name;
      userProfileImg = jsonResponse.images[0].url;
      return { userName, userProfileImg };
    } catch (e) {
      console.log(e);
    }
  },

  // Get all playlists that the user has created
  async getUserOwnedPlaylists() {
    try {
      const response = await fetch("https://api.spotify.com/v1/me/playlists", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const jsonResponse = await response.json();
      const userPlaylists = jsonResponse.items;
      userOwnedPlaylists = userPlaylists.filter((playlist) => {
        return playlist.owner.display_name === userName;
      });
      return userOwnedPlaylists;
    } catch (e) {
      console.log(e);
    }
  },

  // Get all the songs from a specified playlist
  async getPlaylistSongs(playlistID) {
    try {
      const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const jsonResponse = await response.json();
      const playlistTracks = jsonResponse.items;
      return playlistTracks;
    } catch (e) {
      console.log(e);
    }
  },

  // Search Spotify for a specified term
  async search(term) {
    if (!accessToken) {
      accessToken = Spotify.getAccessToken();
    }

    try {
      const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
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
          href: track.album.href,
          previewUrl: track.preview_url,
        };
      });
      return tracksArr;
    } catch (e) {
      console.log(e);
    }
  },

  async savePlaylist(playlistName, trackUriArray, playlistID = null) {
    if (!playlistName || !trackUriArray.length || trackUriArray.length > 100) {
      return;
    }
    const currentAccessToken = accessToken;
    const headers = {
      Authorization: `Bearer ${currentAccessToken}`,
    };
    let userID;

    try {
      // fetch userID
      const response = await fetch("https://api.spotify.com/v1/me", {
        headers: headers,
      });
      const jsonResponse = await response.json();
      userID = jsonResponse.id;

      // If user is creating a new playlist
      if (!playlistID) {
        try {
          // Create a new playlist in the users account
          const postResponse = await fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
            headers: headers,
            method: "POST",
            body: JSON.stringify({
              name: playlistName,
            }),
          });
          const jsonPostResponse = await postResponse.json();
          playlistID = jsonPostResponse.id;
        } catch (e) {
          console.log(e);
        }
        try {
          // Add tracks to the playlist we just created
          await fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
            headers: headers,
            method: "POST",
            body: JSON.stringify({
              uris: trackUriArray,
            }),
          });
        } catch (e) {
          console.log(e);
        }
      } else {
        // If user is updating an existing playlist
        try {
          // Replace tracks in the existing playlist
          await fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
            headers: headers,
            method: "PUT",
            body: JSON.stringify({
              uris: trackUriArray,
            }),
          });
        } catch (e) {
          console.log(e);
        }
        // Update the playlist name just in case the user changed it
        try {
          await fetch(`https://api.spotify.com/v1/playlists/${playlistID}`, {
            headers: headers,
            method: "PUT",
            body: JSON.stringify({
              name: playlistName,
            }),
          });
        } catch (e) {
          console.log(e);
        }
      }
    } catch (e) {
      console.log(e);
    }
  },
};

export default Spotify;
