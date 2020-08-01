import React from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import client from '../../feathers';
import { useHistory } from 'react-router';

const ModeSelect = () => {
    const name = useSelector((state: any) => state.CredentialsReducer.displayName);
    const channel = useSelector((state: any) => state.ChannelReducer.channel);

    const createNewRoom = () => {
        client.service('channel').create({}).then((response: any) => {
            console.log(response);
        }).catch((err: any) => {
            console.error(err);
        })
    }

    let history = useHistory();

    const connectToRoom = () => {
        history.push('/connect');
    };

    return (
        <Container>
            {channel ? <Redirect to='/room' /> : null}
            <Row xs={12} className={'d-flex justify-content-center'}>
               {`Hello ${name}! Please select an option:`} 
            </Row>
            <Row xs={12} className={'d-flex justify-content-center'}>
                <Button onClick={createNewRoom}>
                    {'Create a room'}
                </Button>
                <Button onClick={connectToRoom}>
                    {'Connect to an existing room'}
                </Button>
            </Row>
            
        </Container>
    )
}

export default ModeSelect;