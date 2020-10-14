import React from 'react';
import { RouteProps as ReactDOMRouteProps, Route as ReactDOMRoute, Redirect } from 'react-router-dom';

import { useAuth } from '../hooks';
import { Auth, Dashboard } from '../layouts';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
  title?: string;
  direction?: 'left' | 'right' | null;
}

const Route: React.FC<RouteProps> = ({ isPrivate = false, title, direction, component: Component, ...rest }) => {
  const { user } = useAuth();

  const Layout = isPrivate ? Dashboard : Auth;

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        return isPrivate === !!user ? (
          <Layout title={title} direction={direction}>
            <Component />
          </Layout>
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/dashboard',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;
