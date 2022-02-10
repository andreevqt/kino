import React from 'react';
import { ThemeProvider } from 'styled-components';
import createTheme from './create-theme';
import { TTheme } from './theme';

const Provider = ({ children, theme = {} }: { children: React.ReactNode, theme?: Partial<TTheme> }) => (
  <ThemeProvider theme={createTheme(theme)}>
    {children}
  </ThemeProvider>
);

export default Provider;
