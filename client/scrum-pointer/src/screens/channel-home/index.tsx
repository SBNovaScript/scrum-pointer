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
            {'You are in channel ' + channel + '! 🎉'}
            {users.map((user: any) => 
            <Row key={user._id}>
                <Col xs={6} md={4}>
                    <Image src={user.gravatar} roundedCircle fluid />
                </Col>
                <Col xs={6} md={4}>
                    {user.name}
                </Col>
            </Row>
            )}
        </Container>
    )
}

export default ChannelHome;