import React from 'react'
import { RouteProps, Route, Redirect } from 'react-router-dom'
import { useAppSelector } from '../../services/store'

const ProtectedRoute: React.FC<RouteProps> = ({
  children,
  ...rest
}) => {
  const { user } = useAppSelector((store) => store.user);

  return (
    <Route
      render={({ location }) => user
        ? (
          children
        )
        : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        )
      }
      {...rest}
    />
  );
};

export default ProtectedRoute;
