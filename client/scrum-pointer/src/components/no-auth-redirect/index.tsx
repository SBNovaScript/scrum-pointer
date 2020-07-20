import React, { Fragment, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import client from '../../feathers';

const NoAuthRedirect = ({children}: {children: object}) => {
    const accessToken = useSelector((state: any) => state.CredentialsReducer.accessToken);
    const [serverToken, setServerToken] = useState('');

    // Authenticate from stored token if available.
    client.authenticate().catch((err: any) => setServerToken(''));

    return (
        <Fragment>
            {accessToken ? {...children} : <Redirect to={'/'}/>}
        </Fragment>
    )
}

export default NoAuthRedirect;