import React from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router';
import client from '../../feathers';
import { updateChannel } from '../../redux/actions';

const ModeSelect = () => {
    const name = useSelector((state: any) => state.CredentialsReducer.displayName);
    const channel = useSelector((state: any) => state.ChannelReducer.channel);

    const dispatch = useDispatch();

    client.service('channel').on('created', (user: any, connection: any) => {
        dispatch(updateChannel(user.channel));
    });

    const createNewRoom = () => {
        client.service('channel').create({}).then((response: any) => {
            console.log(response);
        }).catch((err: any) => {
            console.error(err);
        })
    }

    return (
        <Container>
            {channel ? <Redirect to='/room' /> : null}
            <Row xs={12} className={'d-flex justify-content-center'}>
               {'Hello ' + name + '! ' + 'Please select an option:'} 
            </Row>
            <Row xs={12} className={'d-flex justify-content-center'}>
                <Button onClick={createNewRoom}>
                    {'Create a room'}
                </Button>
                <Button>
                    {'Connect to an existing room'}
                </Button>
            </Row>
            
        </Container>
    )
}

export default ModeSelect;