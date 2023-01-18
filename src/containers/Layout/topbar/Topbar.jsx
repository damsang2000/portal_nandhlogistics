import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import TopbarLanguage from '../components/topbar/TopbarLanguage';
import TopbarMail from '../components/topbar/TopbarMail';
import TopbarProfile from '../components/topbar/TopbarProfile';
import TopbarNotification from '../components/topbar/TopbarNotification';
import TopbarSearch from '../components/topbar/TopbarSearch';
import TopbarSidebarButton from '../components/topbar/TopbarSidebarButton';
import TopbarChuhang from '../components/topbar/TopbarChuhang';
import TopbarKho from '../components/topbar/TopbarKho';
import {
  TopbarContainer,
  TopbarLeft,
  TopbarLogo,
  TopbarRight,
  TopbarRightOver,
  TopbarSearchWrap,
} from '../components/topbar/BasicTopbarComponents';
import TopbarMetaMask from '../components/topbar/TopbarMetaMask';
import logo from '../../../asset/img/login/NHLlogo.png';

const Topbar = ({ changeMobileSidebarVisibility, changeSidebarVisibility }) => {
  const wallet = useSelector((state) => state.wallet);
  const history = useHistory();
  const changeDashboard = () => {
    history.push('/dashboard');
  };

  return (
    <TopbarContainer>
      <TopbarLeft>
        <TopbarLogo
          src={logo}
          onClick={changeDashboard}
        />
        <TopbarSidebarButton
          onClickMobile={changeMobileSidebarVisibility}
          onClickDesktop={changeSidebarVisibility}
        />
      </TopbarLeft>
      <TopbarRight>
        <TopbarSearchWrap className="topbar_custom_wrap">
          <TopbarChuhang className="topbar_chuhang" />
          <TopbarKho />
          {/* <TopbarSearch /> */}
        </TopbarSearchWrap>
        <TopbarRightOver>
          {/* <TopbarNotification /> */}
          {/* <TopbarMail new /> */}
          <TopbarProfile className="topbar_profile" />
          {/* <TopbarLanguage /> */}
          {wallet && <TopbarMetaMask />}
        </TopbarRightOver>
      </TopbarRight>
    </TopbarContainer>
  );
};

Topbar.propTypes = {
  changeMobileSidebarVisibility: PropTypes.func.isRequired,
  changeSidebarVisibility: PropTypes.func.isRequired,
};

export default Topbar;
