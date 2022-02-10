import React from 'react';
import { GlobalStyle, ThemeProvider } from '../../theme';
import { Home } from '../../pages';

const App = () => {
  return (
    <ThemeProvider>
      <GlobalStyle />
      <Home />
    </ThemeProvider >
  );
};

export default App;
