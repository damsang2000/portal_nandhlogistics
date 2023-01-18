import { Card, CardBody } from '@/shared/components/Card';
import { Col, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

function CustomizedTick(props) {
  const { x, y, payload } = props;
  let [a, b] = [0, 0];
  if (payload.value) {
    [a, b] = payload.value.split('-');
  }
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        fill="#666"
      >
        <tspan
          textAnchor="middle"
          x="0"
          style={{
            fontSize: '10px',
          }}
        >
          {a !== 0 ? a : ''}
        </tspan>
        <tspan
          textAnchor="middle"
          x="0"
          dy="20"
          style={{
            fontSize: '10px',
          }}
        >
          {b !== 0 ? b : 0}
        </tspan>
      </text>
    </g>
  );
}

export const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length && label) {
    return (
      <div
        className="custom-tooltip"
        style={{
          backgroundColor: '#ecf0f1',
          width: '200px',
          height: '70px',
          padding: '10px',
          borderRadius: '5px',
          border: '1px solid #8884d8',
        }}
      >
        <p
          className="tooltipLabel"
          style={{ fontWeight: 'bold' }}
        >{`${label.split('-')[0]} ${label.split('-')[1]}`}</p>
        <p
          className="tooltipLabel"
          style={{ color: '#8884d8' }}
        >{`${
          payload[0].name
        }: ${payload[0].payload.total.toLocaleString()}`}</p>
      </div>
    );
  }
  return null;
};

const LineSeriesChart = () => {
  const [listCost, setListCost] = useState([]);
  const { Title } = Typography;
  const labels = [
    'Lưu-kho',
    'Xử lý-hàng hóa',
    'Bốc xếp-hàng hóa',
    'Đóng gói-hàng hóa',
    'vật tư-bao bì',
    'Xử lý-DC',
    'Xử lý-hàng hoàn',
    'Xuất-hàng',
  ];
  const color = [
    '#ff4861',
    '#3498db',
    '#8e44ad',
    '#1abc9c',
    '#c0392b',
    '#e1b12c',
    '#4cd137',
    '#192a56',
  ];
  const costItem = useSelector((state) => state.arrCost);
  useEffect(() => {
    if (costItem.arrCost && costItem.arrCost.length !== 0) {
      const data = labels.map((item, index) => {
        return {
          name: item,
          total: costItem.arrCost[index],
        };
      });
      setListCost(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [costItem.arrCost]);

  return (
    <Col
      span={11}
      className="custom_col2"
    >
      <div style={{ width: '100%' }}>
        <Title
          level={5}
          style={{
            padding: '2px 5px',
            color: 'black',
            fontWeight: 'normal',
            marginBottom: '0px',
          }}
        >
          Biểu đồ chi phí vận hành
        </Title>
      </div>
      <Card
        height={100}
        style={{
          borderTop: '3px solid #d1ccc0',
        }}
      >
        <CardBody>
          <div
            className="react-vis"
            dir="ltr"
          >
            <ResponsiveContainer
              width="100%"
              height={200}
            >
              <BarChart
                width={500}
                height={200}
                data={listCost.length !== 0 ? listCost : ''}
                margin={{
                  top: 5,
                  right: 10,
                  left: 15,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  width={100}
                  interval={0}
                  tick={<CustomizedTick />}
                />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  layout="horizontal"
                  verticalAlign="bottom"
                  align="center"
                />
                <Bar
                  dataKey="total"
                  name="Thành tiền"
                  fill="#8884d8"
                >
                  {listCost.length !== 0
                    ? listCost.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={color[index]}
                        />
                      ))
                    : ''}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default LineSeriesChart;
