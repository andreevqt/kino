import React from 'react';
import styled from 'styled-components';

type TContainerProps = {
  fullWidth?: boolean;
  gutter?: boolean;
};

const Container = styled.div<TContainerProps>`
  margin: 0 auto;
  ${({ theme, gutter = true }) => gutter && `padding-left: ${theme.grid.gutter}px;`}
  ${({ theme, gutter = true }) => gutter && `padding-right: ${theme.grid.gutter}px;`}
  ${({ theme, fullWidth }) => fullWidth ? `width: 100%;` : `max-width: ${theme.container.maxWidth}px;`}
`;

export default Container;
