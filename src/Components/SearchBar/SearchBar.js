import React from "react";
import "./SearchBar.css";

export class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { inputTerm: "" };
  }

  handleTermChange = (e) => {
    this.setState({ inputTerm: e.target.value });
  };

  handleSearch = () => {
    this.props.onSearch(this.state.inputTerm);
  };

  handleKeyDown = (e) => {
    if (e.key === "Enter") {
      this.handleSearch();
    }
  };

  render() {
    return (
      <div className="SearchBar">
        <input
          type="text"
          placeholder="Song, Album, or Artist"
          onChange={this.handleTermChange}
          onKeyDown={this.handleKeyDown}
        />
        <button className="SearchButton" onClick={this.handleSearch}>
          SEARCH
        </button>
      </div>
    );
  }
}
