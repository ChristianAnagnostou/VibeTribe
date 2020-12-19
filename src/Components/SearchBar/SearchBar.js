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

  handleKeyPress = (e) => {
    if (e.key === "Enter") {
      this.handleSearch();
    }
  };

  render() {
    return (
      <div className="SearchBar">
        <input
          type="text"
          placeholder="Enter A Song, Album, or Artist"
          onChange={this.handleTermChange}
          onChange={this.handleKeyPress}
        />
        <button className="SearchButton" onClick={this.handleSearch}>
          SEARCH
        </button>
      </div>
    );
  }
}
