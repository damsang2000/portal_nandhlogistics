import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  CiGrid42,
  CiViewTimeline,
  CiShoppingBasket,
  CiMap,
  CiShop,
  CiReceipt,
  CiSaveDown1,
  CiSaveUp1,
  CiStickyNote,
  CiMemoPad,
  CiVault,
  CiViewTable,
  CiSquareMore,
} from 'react-icons/ci';
import { Button, Tour } from 'antd';
import { colorBorder, colorBackground, colorHover } from '@/utils/palette';
import { left } from '@/utils/directions';
import SidebarLink, { SidebarNavLink, SidebarLinkTitle } from './SidebarLink';
import SidebarCategory from './SidebarCategory';
import SidebarLink2 from './SidebarLink2';

const SidebarContent = ({
  onClick,
  changeToLight,
  changeToDark,
  collapse,
  onClickTour,
  ref1,
}) => {
  return (
    <>
      <SidebarContentWrap collapse={collapse}>
        <SidebarBlock collapse={collapse}>
          <SidebarCategory
            title="Tổng quan"
            iconNew={<CiGrid42 />}
            collapse={collapse}
            name="dashboard"
          >
            <SidebarLink
              title="Tổng quan"
              icon="home"
              route="/dashboard"
              onClick={onClick}
            />
            <SidebarCategory
              title="Báo cáo"
              iconNew={<CiReceipt />}
              collapse={collapse}
            >
              <SidebarCategory
                title="Nhập Hàng"
                iconNew={<CiSaveDown1 />}
                collapse={collapse}
              >
                <SidebarLink
                  title="Kế hoạch nhập(ASN)"
                  route="/nh/asn"
                  onClick={onClick}
                />
                <SidebarLink
                  title="Quản lý nhập kho"
                  route="/nh/manage_asn"
                  onClick={onClick}
                />
              </SidebarCategory>
              <SidebarCategory
                title="Xuất Hàng"
                iconNew={<CiSaveUp1 />}
                collapse={collapse}
              >
                <SidebarLink
                  title="Kế hoạch xuất kho"
                  route="/nh/do"
                  onClick={onClick}
                />
                <SidebarLink
                  title="Quản lý phiếu xuất"
                  route="/nh/manage_do"
                  onClick={onClick}
                />
              </SidebarCategory>
              <SidebarCategory
                title="Quản lý kho"
                iconNew={<CiVault />}
                collapse={collapse}
              >
                <SidebarLink
                  title="Kiểm kho"
                  route="/nh/mana_inventory"
                  onClick={onClick}
                />
              </SidebarCategory>
              <SidebarCategory
                title="Chi tiết, lịch sử"
                iconNew={<CiStickyNote />}
                collapse={collapse}
              >
                <SidebarLink
                  title="Chi Tiết Hàng Nhập"
                  route="/nh/asndetail"
                  onClick={onClick}
                />
                <SidebarLink
                  title="Chi Tiết Hàng Xuất"
                  route="/nh/dodetail"
                  onClick={onClick}
                />
                <SidebarLink
                  title="Lịch sử điều chỉnh tồn"
                  route="/nh/regulatoryhistory"
                  onClick={onClick}
                />
                {/* <SidebarLink title="Chi tiết khác" route="/nh/api_table" onClick={onClick} /> */}
              </SidebarCategory>
            </SidebarCategory>
            <SidebarCategory
              title="Báo cáo vận hành"
              iconNew={<CiMemoPad />}
              collapse={collapse}
            >
              <SidebarCategory
                title="Vận Hành"
                icon="book"
                collapse={collapse}
              >
                <SidebarLink
                  title="Nhập Kho"
                  route="/nh/systemasn"
                  onClick={onClick}
                />
                <SidebarLink
                  title="Xuất Kho"
                  route="/nh/systemdo"
                  onClick={onClick}
                />
                <SidebarLink
                  title="Tình hình nhập xuất trong ngày"
                  route="/nh/importexport"
                  onClick={onClick}
                />
              </SidebarCategory>
            </SidebarCategory>
          </SidebarCategory>
        </SidebarBlock>
        <SidebarBlock collapse={collapse}>
          <SidebarCategory
            title="Kho sản phẩm"
            iconNew={<CiViewTimeline />}
            collapse={collapse}
            name="ProductInventory"
          >
            <SidebarCategory
              title="Danh Mục"
              iconNew={<CiViewTable />}
              collapse={collapse}
            >
              <SidebarLink
                title="Danh mục sản phẩm"
                route="/nh/data_table"
                onClick={onClick}
              />
            </SidebarCategory>
            <SidebarCategory
              title="Tồn kho"
              iconNew={<CiSquareMore />}
              collapse={collapse}
            >
              <SidebarLink
                title="Tồn hiện tại"
                route="/nh/currentinventorysell"
                onClick={onClick}
              />
              <SidebarLink
                title="Xuất nhập tồn"
                route="/nh/agingreport"
                onClick={onClick}
              />
              <SidebarLink
                title="Tồn hiện tại theo phiếu nhập"
                route="/nh/currentinventory"
                onClick={onClick}
              />
            </SidebarCategory>
          </SidebarCategory>
        </SidebarBlock>

        <SidebarBlock collapse={collapse}>
          <SidebarLink
            title="Sản phẩm đang bán"
            route="/nh/productsell"
            onClick={onClick}
            iconNew={<CiShoppingBasket />}
            name="sellProduct"
          />

          <SidebarLink
            title="Hướng dẫn sử dụng"
            route="/nh/onboarding"
            onClick={onClick}
            iconNew={<CiMap />}
          />

          <SidebarCategory
            title="Kết nối shop"
            iconNew={<CiShop />}
            collapse={collapse}
            name="connectShop"
          >
            <SidebarLink
              title="Tiki"
              route="/nh/config_tiki"
              onClick={onClick}
            />
          </SidebarCategory>
        </SidebarBlock>
      </SidebarContentWrap>
    </>
  );
};

SidebarContent.propTypes = {
  changeToDark: PropTypes.func.isRequired,
  changeToLight: PropTypes.func.isRequired,
  onClick: PropTypes.func,
  collapse: PropTypes.bool,
};

SidebarContent.defaultProps = {
  collapse: false,
  onClick: () => {},
};

export default SidebarContent;

// region STYLES

const SidebarContentWrap = styled.div`
  height: 100%;
  overflow: auto;
  padding-top: 0;

  & > div:last-child {
    width: 4px !important;

    div {
      transition: height 0.3s;
      opacity: 0.52;
    }
  }

  @media screen and (min-width: 576px) {
    padding-top: 15px;

    ${(props) =>
      props.collapse &&
      `
      width: 55px;
      overflow: visible !important;
      transition: width 0.3s;
    `}
  }
`;

const SidebarBlock = styled.ul`
  padding: 15px 0;
  border-bottom: 1px solid ${colorBorder};
  list-style-type: none;

  &:last-child {
    border: none;
  }

  @media screen and (min-width: 576px) {
    ${(props) =>
      props.collapse &&
      `
      & > li > a,
      & > li > button {
        overflow: hidden;
        width: 55px;
        background: ${colorBackground(props)};
        
        span:last-of-type {
          opacity: 0;
          transition: 0.3s;
        }
  
        ${SidebarLinkTitle} {
          position: absolute;
          width: 160px;
          ${left(props)}: 70px;
        }
  
        &:hover {
          background: ${colorHover(props)};
        }
      }
      
      & > li:hover > a,
      & > li:hover > button {
        width: 275px;
        
        span {
          opacity: 1;
        }
      }
    `}
  }
`;

// endregion
