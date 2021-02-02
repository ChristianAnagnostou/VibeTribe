import React from "react";
// Redux
import { useDispatch } from "react-redux";
import { changeTab } from "../../redux/actions/userActions";
// Styles
import styled from "styled-components";

const Tabs = () => {
  const dispatch = useDispatch();

  const handleTabClick = (tab) => {
    dispatch(changeTab(tab));
  };
  
  return (
    <Nav>
      <h1 onClick={() => handleTabClick("results")}>Results</h1>
      <h1 onClick={() => handleTabClick("playlist")}>Playlist</h1>
    </Nav>
  );
};

export default Tabs;

const Nav = styled.nav`
  background: rgb(241, 250, 238);
  color: rgb(29, 53, 87);
  display: flex;
  height: 2.5rem;

  h1 {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-bottom: 1px solid rgb(221, 221, 221);

    &:hover {
      background: rgb(236, 236, 236);
    }
    &:first-child {
      border-right: 1px solid rgb(221, 221, 221);
    }
  }
`;
