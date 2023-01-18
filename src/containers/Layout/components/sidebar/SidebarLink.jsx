import React from 'react';
import PropTypes from 'prop-types';
import { Badge } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { lighten } from 'polished';
import {
  colorAccent,
  colorHover,
  colorRedHover5,
  colorRedHover,
  colorText,
  sidebarColor,
  colorGrayHover,
  colorRed,
  colorGray,
} from '@/utils/palette';
import { 
  left,
  marginLeft,
  marginRight,
} from '@/utils/directions';

const SidebarLink = ({
  title, icon, newLink, route, onClick,
}) => (
  <li>
    <SidebarNavLink
      to={route}
      onClick={onClick}
      activeClassName="active"
    >
      {icon ? <SidebarLinkIcon className={`lnr lnr-${icon}`} /> : ''}
      <SidebarLinkTitle>
        {title}
        {newLink ? (
          <NewBadge bg="custom">
            <span>New</span>
          </NewBadge>
        ) : ''}
      </SidebarLinkTitle>
    </SidebarNavLink>
  </li>
);

SidebarLink.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
  newLink: PropTypes.bool,
  route: PropTypes.string,
  onClick: PropTypes.func,
};

SidebarLink.defaultProps = {
  icon: '',
  newLink: false,
  route: '/',
  onClick: () => {},
};

export default SidebarLink;

// region STYLES

export const SidebarNavLink = styled(NavLink)`
  height: 46px;
  width: 240px;
  transition: all 0.3s;
  position: relative;
  cursor: pointer;
  display: flex;
  padding: 11px 20px;
  overflow: hidden;
  background: transparent;
  border: none;
  color: ${colorText};
  text-align: ${left};
  font-size: 14px;

  &.active {
    color: ${colorRed};
    font-weight:bold;
    &:hover{
      color: ${colorRed};
      &:before {
      opacity: 1;
    }
    }
    &:before {
      opacity: 1;
    }
  }

  &:before {
    content: "";
    position: absolute;
    top: 0;
    height: 100%;
    width: 2px;
    background: ${colorRed};
    opacity: 0;
    transition: all 0.3s;
    ${left}: 0;
  }

  &:hover {
    text-decoration: none;
    background-color: ${colorGrayHover};
    color: ${colorText};

    &:before {
      opacity: 0;
    }
  }

  @media screen and (min-width: 576px) {
    width: 100%;

    span {
      position: relative;
      animation: none;
      ${left}: 0;
    }
  }
`;

const NewBadge = styled(Badge)`
  width: 26px;
  height: 14px;
  background-color: ${colorRed};
  font-size: 8px;
  font-weight: 400;
  padding: 2px;
  line-height: 9px;
  position: relative;
  text-transform: uppercase;
  border-radius: 7px;
  ${marginLeft}: 5px;

  span {
    position: absolute;
    top: 3px;
    width: 26px;
    text-align: center;
    ${left}: 0;
  }
`;

export const SidebarLinkTitle = styled.span`
  margin: 0;
  font-size: 13px;
  position: relative;
  display: flex;
  align-items: center;
  white-space: nowrap;
`;

export const SidebarLinkIcon = styled.span`
  font-size: 19px;
  line-height: 20px;
  color:  ${colorRed};
  ${marginRight}: 10px;
`;

// endregion
