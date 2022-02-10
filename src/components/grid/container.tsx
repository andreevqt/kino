import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin: 0 auto;
  max-width: ${({theme}) => theme.container.maxWidth}px;
  padding: 0 ${({theme}) => `${theme.grid.gutter}px`};
`;

export default Container;
