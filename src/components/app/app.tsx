import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { GlobalStyle, ThemeProvider } from '../../theme';
import { Home, Movie, Login, Logout } from '../../pages';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { getUser } from '../../services/slices/user';

const App = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, []);

  return (
    <ThemeProvider>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/logout" exact>
            <Logout />
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
