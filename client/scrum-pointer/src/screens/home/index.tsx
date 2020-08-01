import React, { useEffect } from 'react';
import client from '../../feathers';
import { githubURL, googleURL } from '../../constants';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { updateCredentials } from '../../redux/actions';
import { Redirect } from 'react-router';

const Home = () => {

    const accessToken = useSelector((state: any) => state.CredentialsReducer.accessToken)

    const dispatch = useDispatch();
    client.on('authenticated', (data: any) => {
        // console.log('Authenticated with ', data);
        dispatch(updateCredentials({
            accessToken: data.accessToken,
            username:data.user.name,
            displayName: data.user.name
        }));
    })

    useEffect(() => {
        if (accessToken === null) {
            client.authenticate().catch((err: any) => console.log(err));
        }
    }, [accessToken])

    return (
        <Container>
            {accessToken ? <Redirect to='/select' /> :  null}
            <Row xs={12} className={'d-flex justify-content-center'}>
                <h1>Welcome!</h1>
            </Row>
            <Row xs={12} className={'d-flex justify-content-center'}>
                <p>{'Scrum Pointer is a real-time, fullstack Scrum pointing solution. To continue, please:'}</p>
            </Row>
            <Row className={'justify-content-md-center'}>
                <Col xs sm={'12'} md={'auto'} className={'d-flex justify-content-center'}>
                    <Button variant={'danger'} href={githubURL}>
                        {'Login With GitHub'}
                    </Button>
                </Col>
                <Col xs sm={'12'} md={'auto'} className={'d-flex justify-content-center'}>
                    <Button variant={'warning'} href={googleURL}>
                        {'Login With Google'}
                    </Button>
                </Col>
                
            </Row>
        </Container>
    )
}

export default Home;