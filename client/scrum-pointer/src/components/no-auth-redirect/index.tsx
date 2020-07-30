import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import client from '../../feathers';

const NoAuthRedirect = ({children}: {children: object}) => {
    const accessToken = useSelector((state: any) => state.CredentialsReducer.accessToken);
    const channel = useSelector((state: any) => state.ChannelReducer.channel);

    // Authenticate from stored token if available.
    client.authenticate().catch((err: any) => console.log(err));

    const redirectRoute = {
        home: Boolean(!accessToken && !channel),
        select: Boolean(accessToken && !channel)
    }

    return (
        <Fragment>
            {redirectRoute.home ? <Redirect to={'/'}/> : {...children}}
            {redirectRoute.select ? <Redirect to={'/select'} /> : null}
        </Fragment>
    )
}

export default NoAuthRedirect;