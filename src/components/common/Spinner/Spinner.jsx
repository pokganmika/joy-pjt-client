import React from 'react';
import styled from 'styled-components';
import Loader from 'react-loader-spinner';

const Spinner = () => {
  return (
    <DivSpinner>
      <Loader type="Triangle" color="#00BFFF" height="200" width="200" />
    </DivSpinner>
  );
};

const DivSpinner = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  margin-top: -50px;
  margin-left: -100px;
`;

export default Spinner;
