import React from 'react';
import styled from 'styled-components';

type TContainerProps = {
  fullWidth?: boolean;
  gutter?: boolean;
  size?: 'sm' | 'md';
};

const Container = styled.div<TContainerProps>`
  margin: 0 auto;
  ${({ theme, gutter = true, fullWidth, size = 'md' }) => `
    ${gutter && `
      padding-left: ${theme.grid.gutter}px;
      padding-right: ${theme.grid.gutter}px;
    `}
    ${fullWidth
      ? `width: 100%;` : size === 'md'
        ? `max-width: ${theme.container.md}px;`
        : `max-width: ${theme.container.sm}px;`
    }
  `}
`;

export default Container;
