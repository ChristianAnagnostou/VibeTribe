import React from "react";
// Redux
import { useSelector } from "react-redux";
// Components
import { MemoizedTrackList } from "../TrackList/TrackList";
// Styles
import styled from "styled-components";

const SearchResults = () => {
  // Redux
  const { searchResults } = useSelector((state) => state.results);

  return (
    <SearchResultsContainer>
      <h2>Results</h2>
      <MemoizedTrackList tracks={searchResults} isRemovable={false} />
    </SearchResultsContainer>
  );
};

export default SearchResults;

const SearchResultsContainer = styled.div`
  margin: 1rem;

  h2 {
    color: white;
    font-size: 1.5rem;
  }
`;
