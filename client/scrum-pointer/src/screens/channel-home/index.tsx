import React, { useState } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import client from '../../feathers';

const ChannelHome = () => {
    const channel = useSelector((state: any) => state.ChannelReducer.channel);

    const [users, setUsers] = useState([]);

    if (users.length === 0) {
        client.service('channel').get(channel).then((result: any) => {
            setUsers(result);
        });
    }

    client.service('channel').on('updated', (connectedChannel: any, connection: any) => {
        client.service('channel').get(connectedChannel.channel).then((result: any) => {
            setUsers(result);
        });
    });

    return (
        <Container>
            <Row className={'justify-content-center'}>
                <h2 className={'text-muted'}>
                    {'You are in channel '}
                </h2>
            </Row>
            <Row className={'justify-content-center mb-4'}>
                <h2>
                    {`${channel} 🎉`}
                </h2>
            </Row>
            <Container className={'jumbotron'}>
                <Row className={'justify-content-center mb-5 text-center'}>
                    <h3>
                        <u>
                            {'This is the title of the ticket'}
                        </u>
                    </h3>
                </Row>
                <Row xs={6} className={'justify-content-around align-middle'}>
                    <Container>
                        {users.map((user: any) => 
                        <Row key={user._id}>
                            <Col>
                                <Image src={user.gravatar} roundedCircle thumbnail />
                            </Col>
                            <Col>
                                <p>
                                    {user.name}
                                </p>
                                <h5 className={'text-center'}>
                                    {'3'}
                                </h5>
                            </Col>
                        </Row>
                        )}
                    </Container>
                    <Container className={'align-self-center'}>
                        <h1>
                            {'3'}
                        </h1>
                    </Container>
                </Row>
            </Container>
        </Container>
    )
}

export default ChannelHome;