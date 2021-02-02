const initialState = { playlistTracks: [], playlistName: "", playlistID: null };

export default (state = initialState, action) => {
  switch (action.type) {
    case "IMPORT_PLAYLIST":
      return {
        playlistTracks: [...action.payload.playlistTracks],
        playlistName: action.payload.playlistName,
        playlistID: action.payload.playlistID,
      };
    case "ADD_TRACK":
      if (state.playlistTracks.find((savedTrack) => savedTrack.id === action.payload.track.id)) {
        return state;
      } else {
        return { ...state, playlistTracks: [...state.playlistTracks, action.payload.track] };
      }
    case "REMOVE_TRACK":
      const filteredTracks = state.playlistTracks.filter(
        (savedTrack) => savedTrack.id !== action.payload.track.id
      );
      return { ...state, playlistTracks: [...filteredTracks] };
    case "CLEAR_PLAYLIST":
      return initialState;
    default:
      return state;
  }
};
