// Util
import Spotify from "../../util/Spotify";

export const userLogin = () => async (dispatch) => {
  try {
    const userInfo = await Spotify.getUserInfo();

    dispatch({
      type: "USER_LOGIN",
      payload: { userInfo },
    });
  } catch (e) {
    console.log(e);
  }
};

export const changeTab = (tab) => {
  return { type: "CHANGE_TAB", payload: { tab } };
};

export const getUserPlaylists = (userName) => async (dispatch) => {
  try {
    const userPlaylists = await Spotify.getUserOwnedPlaylists(userName);

    dispatch({
      type: "UPDATE_USER_OWNED_PLAYLISTS",
      payload: { userPlaylists },
    });
  } catch (e) {
    console.log(e);
  }
};
