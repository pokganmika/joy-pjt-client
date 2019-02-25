import React from 'react';
import ReactMarkdown from 'react-markdown';

import styled from 'styled-components';

const Render = ({ comments }) => {
  return <ReactMarkdown source={comments} />;
};

// const DivFull = styled.div`
//   width: 1200px;
//   right: 0px;
//   top: 100px;
//   height: 200px;
//   background-color: lightgray;
// `;

export default Render;
