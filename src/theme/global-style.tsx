import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { TTheme } from './theme';

const GlobalStyle = createGlobalStyle<{ theme: TTheme }>`
  body {
    margin: 0;
    font-family: ${({ theme }) => `${theme.font.family}`};
    font-size: ${({ theme }) => `${theme.font.sizes[1]}px`};
    background-color: ${({ theme }) => `${theme.colors.background.base}`};
    color: ${({ theme }) => `${theme.colors.body.base}`};
    line-height: 1.2;
  }

  *,
  ::before,
  ::after {
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 700;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    margin: 0;
  }

  button {
    font-family: ${({ theme }) => `${theme.font.family}`};
    font-size: ${({ theme }) => `${theme.font.sizes[1]}px`};
    cursor: pointer;
  }

  .mr-1 {
    margin-right: ${({theme}) => `${theme.spaces[1]}px`};
  }

  .mr-2 {
    margin-right: ${({theme}) => `${theme.spaces[2]}px`};
  }

  .mr-3 {
    margin-right: ${({theme}) => `${theme.spaces[3]}px`};
  }

  .mr-4 {
    margin-right: ${({theme}) => `${theme.spaces[4]}px`};
  }

  .mr-5 {
    margin-right: ${({theme}) => `${theme.spaces[5]}px`};
  }

  .mr-6 {
    margin-right: ${({theme}) => `${theme.spaces[6]}px`};
  }

  .mr-7 {
    margin-right: ${({theme}) => `${theme.spaces[7]}px`};
  }

  .mr-8 {
    margin-right: ${({theme}) => `${theme.spaces[8]}px`};
  }

  .mr-9 {
    margin-right: ${({theme}) => `${theme.spaces[9]}px`};
  }

  .mr-10 {
    margin-right: ${({theme}) => `${theme.spaces[10]}px`};
  }
`;

export default GlobalStyle;
