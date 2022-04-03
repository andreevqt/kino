import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Settings from './settings';

const Index: React.FC = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={path} exact>
        <Settings />
      </Route>
      <Route path={`${path}/likes`} exact>
        <Settings />
      </Route>
      <Route path={`${path}/reviews`} exact>
        <Settings />
      </Route>
    </Switch>
  );
};

export default Index;
