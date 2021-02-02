// Util
import Spotify from "../../util/Spotify";

export const importPlaylist = (playlistID, playlistName) => async (dispatch) => {
  try {
    const playlist = await Spotify.getPlaylistSongs(playlistID);
    const playlistTracks = playlist.map((track) => track.track);

    dispatch({
      type: "IMPORT_PLAYLIST",
      payload: { playlistTracks, playlistName, playlistID },
    });
  } catch (e) {
    console.log(e);
  }
};

export const addTrack = (track) => {
  return { type: "ADD_TRACK", payload: { track } };
};
export const removeTrack = (track) => {
  return { type: "REMOVE_TRACK", payload: { track } };
};

export const clearPlaylist = () => {
  return { type: "CLEAR_PLAYLIST" };
};

export const savePlaylist = (playlistTracks, playlistName, playlistID, userID) => async (
  dispatch
) => {
  const trackURIs = playlistTracks.map((track) => track.uri);

  try {
    await Spotify.savePlaylist(playlistName, trackURIs, playlistID, userID);
    dispatch(clearPlaylist());
  } catch (e) {
    console.log(e);
  }
};
