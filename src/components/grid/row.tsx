import React from 'react';
import styled from 'styled-components';

type TRowProps = {
  $center?: boolean;
  $end?: boolean;
  $gutter?: boolean;
  className?: string;
};

const Row = styled.div<TRowProps>`
  display: flex;
  flex-wrap: wrap;
  ${({ theme, $gutter = true }) => $gutter && `margin-left: -${theme.grid.gutter}px;`}
  ${({ theme, $gutter = true }) => $gutter && `margin-right: -${theme.grid.gutter}px;`}
  ${({ $center = false }) => $center && `justify-content: center;`}
  ${({ $end = false }) => $end && `justify-content: end;`}
  & > * {
    box-sizing: border-box;
    flex-shrink: 0;
    width: 100%;
    max-width: 100%;
    ${({ theme, $gutter = true }) => $gutter && `padding: 0 ${theme.grid.gutter}px;`}
  }
`;

export default Row;
