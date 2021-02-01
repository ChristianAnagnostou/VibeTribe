import React from "react";
// Components
import TrackList from "../TrackList/TrackList";
// Styles
import styled from "styled-components";

const SearchResultsNew = ({ searchResults, onAdd }) => {
  return (
    <SearchResultsContainer>
      <h2>Results</h2>
      <TrackList
        tracks={searchResults}
        isRemovable={false}
        onAdd={onAdd}
      />
    </SearchResultsContainer>
  );
};

export default SearchResultsNew;

const SearchResultsContainer = styled.div`
  width: 100%;
  height: fit-content;
  margin: 1rem;

  h2 {
    color: white;
    font-size: 1.5rem;
  }

  @media only screen and (max-width: 1020px) {
    width: 90%;
    margin-bottom: 2rem;
  }
`;
