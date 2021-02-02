// Util
import Spotify from "../../util/Spotify";

export const searchSpotify = (term) => async (dispatch) => {
  console.log(`searching spotify for ${term}`);
  try {
    const searchResults = await Spotify.search(term);

    dispatch({
      type: "POPULATE_RESULTS",
      payload: {
        searchResults: searchResults.tracks.items,
        nextResultSet: searchResults.tracks.next,
      },
    });
  } catch (e) {
    console.log(e);
  }
};

