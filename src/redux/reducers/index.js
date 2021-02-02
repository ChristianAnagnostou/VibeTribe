import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { playlistReducer } from "./playlistReducer";
import { resultsReducer } from "./resultsReducer";

export default combineReducers({
  user: userReducer,
  playlist: playlistReducer,
  results: resultsReducer,
});
