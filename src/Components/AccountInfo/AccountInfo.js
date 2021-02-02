import React, { useState, useEffect } from "react";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { importPlaylist } from "../../redux/actions/playlistActions";
// Components
import ActiveTab from "./ActiveTab";
// Styles
import styled from "styled-components";
import { changeTab, getUserPlaylists } from "../../redux/actions/userActions";

const AccountInfo = () => {
  // Redux
  const user = useSelector((state) => state.user);
  // Local State
  const [tabActive, setTabActive] = useState(false);

  const toggleTab = () => {
    setTabActive(!tabActive);
  };

  return (
    <AccountInfoContainer>
      <img src={user.images[0].url} alt="User" className="user-image" onClick={toggleTab} />
      {tabActive && <ActiveTab userName={user.display_name} playlists={user.userOwnedPlaylists} />}
    </AccountInfoContainer>
  );
};

export default AccountInfo;

const AccountInfoContainer = styled.div`
  position: relative;

  img {
    cursor: pointer;
    height: 40px;
    width: 40px;
    border: 2px solid white;
    border-radius: 50%;
  }
`;
