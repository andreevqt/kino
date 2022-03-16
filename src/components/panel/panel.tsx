import React from 'react';
import styled from 'styled-components';

export const Panel = styled.div<{ transparent?: boolean }>`
  ${({ theme, transparent = false }) => `
    background-color: ${transparent ? 'transparent' : theme.review};
    border-radius: ${theme.radius.small};
  `}
`;

export const PanelBody = styled.div`
  padding: ${({ theme }) => `${theme.spaces[5]}px`};
`;

export const PanelFooter = styled.div`
  display: flex;
  align-items: center;
  border-top: 1px solid ${({ theme }) => theme.colors.background.base};
  padding: ${({ theme }) => `${theme.spaces[5]}px`};
`;

export const PanelHeader = styled.div`
  padding: ${({ theme }) => `${theme.spaces[5]}px`};
  border-bottom: 1px solid ${({ theme }) => theme.colors.background.base};
  display: flex;
`;
