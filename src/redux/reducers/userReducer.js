const initialState = {
  loggedIn: false,
  currentTab: "results",
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER_LOGIN":
      return { ...state, ...action.payload.userInfo, loggedIn: true };
    case "CHANGE_TAB":
      return { ...state, currentTab: action.payload.tab };
    case "UPDATE_USER_OWNED_PLAYLISTS":
      return { ...state, userOwnedPlaylists: action.payload.userPlaylists };
    default:
      return state;
  }
};
