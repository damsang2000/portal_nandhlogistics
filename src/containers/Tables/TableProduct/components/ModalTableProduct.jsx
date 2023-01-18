import React from 'react';
import { Descriptions, Col, Row, Modal } from 'antd';

const ModalTableProduct = (props) => {
  return (
    <Modal
      open={props.open}
      onCancel={props.callBackCancel}
      bodyStyle={{ overflowY: 'auto', maxHeight: 'calc(100vh - 150px)' }}
      className="custom-modal"
      width={1000}
      footer={null}
    >
      <Row>
        <Col span={12}>
          <Descriptions
            bordered
            style={{ marginBottom: '10px', width: '95%' }}
            size="small"
          >
            <Descriptions.Item
              label="SKU"
              span={4}
            >
              {props.dataDetail.ma_San_Pham || ''}
            </Descriptions.Item>
            <Descriptions.Item
              label="Sub Code"
              span={4}
            ></Descriptions.Item>
            <Descriptions.Item
              label="SKU Category"
              span={4}
            ></Descriptions.Item>
            <Descriptions.Item
              label="Put Strategy"
              span={4}
            ></Descriptions.Item>
            <Descriptions.Item
              label="Min Putaway Floor"
              span={4}
            ></Descriptions.Item>
            <Descriptions.Item
              label="Max Putaway Floor"
              span={4}
            ></Descriptions.Item>
            <Descriptions.Item
              label="Pick FIFO Definition"
              span={4}
            ></Descriptions.Item>
            <Descriptions.Item
              label="Pick Strategy"
              span={4}
            ></Descriptions.Item>
          </Descriptions>
        </Col>
        <Col span={12}>
          <Descriptions
            bordered
            style={{ marginBottom: '10px' }}
            size="small"
          >
            <Descriptions.Item
              label="Item Name"
              span={3}
            >
              <p className="p_fw">{props.dataDetail.ten_San_Pham || ''}</p>
            </Descriptions.Item>
            <Descriptions.Item
              label="Unit"
              span={3}
            >
              <p className="p_fw">{props.dataDetail.ten_Don_Vi_Tinh || ''}</p>
            </Descriptions.Item>
            <Descriptions.Item
              label="Inner Pack"
              span={3}
            >
              <p className="p_fw">{props.dataDetail.sL_Cai_1_Thung || ''}</p>
            </Descriptions.Item>
            <Descriptions.Item
              label="Inner Pallet"
              span={3}
            >
              <p className="p_fw">{props.dataDetail.sL_Thung_1_Pallet || ''}</p>
            </Descriptions.Item>
            <Descriptions.Item
              label="GW"
              span={3}
            >
              <p className="p_fw">
                {props.dataDetail.gw === 0 ? 0 : props.dataDetail.gw}
              </p>
            </Descriptions.Item>
            <Descriptions.Item
              label="NW"
              span={3}
            >
              <p className="p_fw">
                {props.dataDetail.nw === 0 ? 0 : props.dataDetail.nw}
              </p>
            </Descriptions.Item>
            <Descriptions.Item
              label="CBM"
              span={3}
            >
              <p className="p_fw">
                {props.dataDetail.cbm === 0 ? 0 : props.dataDetail.cbm}
              </p>
            </Descriptions.Item>
            <Descriptions.Item
              label="Số ngày sử dụng"
              span={3}
            >
              <p className="p_fw">
                {props.dataDetail.so_Ngay_Su_Dung === 0
                  ? 0
                  : props.dataDetail.so_Ngay_Su_Dung}
              </p>
            </Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
    </Modal>
  );
};

export default ModalTableProduct;
