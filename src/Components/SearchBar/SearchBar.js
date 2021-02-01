import React, { useState } from "react";
// Styles
import styled from "styled-components";

const SearchBarNew = ({ onSearch }) => {
  const [inputTerm, setInputTerm] = useState("initialState");

  const handleTermChange = (e) => {
    setInputTerm(e.target.value);
  };

  const handleSearch = () => {
    onSearch(inputTerm);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <SearchBarContainer>
      <h1>Get some tunes going!</h1>
      <p></p>
      <input
        type="text"
        placeholder="song, album, or artist..."
        onChange={handleTermChange}
        onKeyDown={handleKeyDown}
      />
      <SearchButton onClick={handleSearch}>SEARCH</SearchButton>
    </SearchBarContainer>
  );
};

export default SearchBarNew;

const SearchBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 2rem;

  h1 {
    font-size: 1.75rem;
  }

  input {
    width: 100%;
    max-width: 400px;
    margin: 1rem 0;
    padding: 0.75rem;
    background: rgb(241, 250, 238);
    font-family: Lato, sans-serif;
    font-size: 1.3rem;
    border: 1px solid #f3f3f5;
    border-radius: 4px;
    transition: background-color 0.2s ease;

    &:focus {
      outline: none;
    }
  }
`;

const SearchButton = styled.div`
  cursor: pointer;
  width: 8.11rem;
  padding: 0.77rem 0;
  border-radius: 54px;
  background-color: rgb(69, 123, 157);
  text-align: center;
  font-size: 0.8rem;
  font-weight: 500;
  border: none;
  transition: all 0.25s;

  &:hover {
    color: #535353;
    background-color: rgb(168, 218, 220);
  }
`;
