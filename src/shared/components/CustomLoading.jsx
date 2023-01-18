import React from 'react';
import styled from 'styled-components';
import ReactLoading from 'react-loading';




// eslint-disable-next-line react/prop-types
const CustomLoading = ({ loading }) => (
  <LoadingContainer loading={loading}>
    <Loading type="spinningBubbles" color="red" className="loading-custom" /> 
  </LoadingContainer>
  );

export default CustomLoading;

const Loading = styled(ReactLoading)`
    position: fixed;
    top: 48%;
    left: 50%;
    z-index: 400;
    color: red;
`;

const LoadingContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color:transparent;
    z-index: 400; 
    ${props => !props.loading && 'visibility: hidden'};
`;

