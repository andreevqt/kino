import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { GlobalStyle, ThemeProvider } from '../../theme';
import { Home, Movie } from '../../pages';

const App = () => {
  return (
    <ThemeProvider>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/movies/:movieId">
            <Movie />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider >
  );
};

export default App;
