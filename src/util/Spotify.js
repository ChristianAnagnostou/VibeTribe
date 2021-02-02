const clientID = "053f2e85785e496ab82d9b0f6b8d29e6";
// const redirectURI = "http://localhost:3000/"; //only used for dev testing
const redirectURI = "http://vibetribe.surge.sh/";
let accessToken;

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

    // fetch user data
    const userInfo = await this.getUserData();
    const userName = userInfo.display_name;
    // fetch the user owned playlists
    const userOwnedPlaylists = await this.getUserOwnedPlaylists(userName);
    return { ...userInfo, userOwnedPlaylists };
  },

  // Get the user data
  async getUserData() {
    try {
      const response = await fetch("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const userInfoResponse = await response.json();
      return userInfoResponse;
    } catch (e) {
      console.log(e);
    }
  },

  // Get all playlists that the user has created
  async getUserOwnedPlaylists(userName) {
    try {
      const response = await fetch("https://api.spotify.com/v1/me/playlists", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const jsonResponse = await response.json();
      const userPlaylists = jsonResponse.items;

      const userOwnedPlaylists = userPlaylists.filter((playlist) => {
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
      const searchResponse = await response.json();
      return searchResponse;
    } catch (e) {
      console.log(e);
    }
  },

  // Create a new playlist in the users account
  async createNewPlaylist(userID, playlistName, trackUriArray, headers) {
    let playlistID;

    try {
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
  },

  async updatePlaylist(playlistID, playlistName, trackUriArray, headers) {
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
  },

  async savePlaylist(playlistName, trackUriArray, playlistID, userID) {
    if (!playlistName || !trackUriArray.length || trackUriArray.length > 100) {
      return new Error(
        "Playlists must be between 1 and 100 songs and a playlist name must be included."
      );
    }
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    if (!playlistID) {
      this.createNewPlaylist(userID, playlistName, trackUriArray, headers);
    } else {
      this.updatePlaylist(playlistID, playlistName, trackUriArray, headers);
    }
  },
};

export default Spotify;
