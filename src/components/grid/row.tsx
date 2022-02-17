import React from 'react';
import styled from 'styled-components';

type TRowProps = {
  center?: boolean;
}

const Row = styled.div<TRowProps>`
  display: flex;
  flex-wrap: wrap;
  margin-left: ${({ theme }) => `-${theme.grid.gutter}`}px;
  margin-right: ${({ theme }) => `-${theme.grid.gutter}`}px;
  ${({ center }) => center && `justify-content: center;`}
  & > * {
    box-sizing: border-box;
    flex-shrink: 0;
    width: 100%;
    max-width: 100%;
    padding-left: ${({ theme }) => `${theme.grid.gutter}`}px;
    padding-right: ${({ theme }) => `${theme.grid.gutter}`}px;
  }
`;

export default Row;
