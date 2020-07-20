import React, { useState, useEffect } from 'react';
import client from '../../feathers';
import { githubURL } from '../../constants';
import { Button, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { updateCredentials } from '../../redux/actions';
import { Redirect } from 'react-router';

const Home = () => {

    const accessToken = useSelector((state: any) => state.CredentialsReducer.accessToken)

    const [errorCode, setErrorCode] = useState('');

    const dispatch = useDispatch();
    // const state = useSelector((state: any) => state.CredentialsReducer.displayName);
    client.on('authenticated', (data: any) => {
        console.log('Authenticated with ', data);
        dispatch(updateCredentials({
            accessToken: data.accessToken,
            username:data.user.name,
            displayName: data.user.displayName
        }));

    })

    useEffect(() => {
        if (accessToken === null) {
            client.authenticate().catch((err: any) => setErrorCode(err));
        }
    }, [accessToken])

    return (
        <Container>
            {accessToken ? <Redirect to='/select' /> :  null}
            <Row xs={12} className={'d-flex justify-content-center'}>
                <h1>Welcome!</h1>
            </Row>
            <Row xs={12} className={'d-flex justify-content-center'}>
                <Button variant={'danger'} href={githubURL}>
                    {'Login With GitHub'}
                </Button>
            </Row>
        </Container>
    )
}

export default Home;