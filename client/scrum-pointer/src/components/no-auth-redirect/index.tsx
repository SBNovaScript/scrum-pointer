import React, { Fragment, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import client from '../../feathers';

const NoAuthRedirect = ({children}: {children: object}) => {
    const accessToken = useSelector((state: any) => state.CredentialsReducer.accessToken);
    const channel = useSelector((state: any) => state.ChannelReducer.channel);
    const [serverToken, setServerToken] = useState('');

    // Authenticate from stored token if available.
    client.authenticate().catch((err: any) => setServerToken(''));

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