const initialState = { searchResults: [], nextResultSet: "" };

export default (state = initialState, action) => {
  switch (action.type) {
    case "POPULATE_RESULTS":
      return {
        searchResults: [...action.payload.searchResults],
        nextResultSet: action.payload.nextResultSet,
      };
    default:
      return state;
  }
};
