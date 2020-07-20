import React from 'react';
import { Route } from 'react-router';
import NoAuthRedirect from '../no-auth-redirect';

const AuthenticatedRoute = ({path, children}: {path: any, children: object}) => {
    return (
        <Route path={path}>
            <NoAuthRedirect>
              {{...children}}
            </NoAuthRedirect>
        </Route>
    )
}

export default AuthenticatedRoute;