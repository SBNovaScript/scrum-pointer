import React from 'react';
import { Container, Row, Button, Form } from 'react-bootstrap';
import client from '../../feathers';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router';
import { updateChannel } from '../../redux/actions';

const ConnectToRoom = () => {

    const roomCodeControlName = 'formRoomCode';
    const storedRoomCode = useSelector((state: any) => state.ChannelReducer.channel);
    const dispatch = useDispatch();

    const connectToNewRoom = (roomCode: string) => {
        client.service('channel').update(0, {providedChannel: roomCode}).then((response: any) => {
            dispatch(updateChannel(response.channel));
        }).catch((err: any) => {
            console.error(err);
        })
    }

    const submitRoomCode = (event: any) => {
        const form = event.currentTarget;
        if(form.checkValidity()){
            event.preventDefault();
            event.stopPropagation();
        }
        
        // Form is validated
        client.service('channel').get(form[roomCodeControlName].value).then((response: any) => {
            if (response.length !== 0) {
                connectToNewRoom(form[roomCodeControlName].value);
            }
        }).catch((err: any) => {
            console.log(err);
        })
    }

    return (
        <Container>
            {storedRoomCode ? <Redirect to={'/room'} /> : null}
            <Row xs={12} className={'d-flex justify-content-center'}>
                {'Please type the room code! 🎆'}
            </Row>
            <Row xs={12} className={'d-flex justify-content-center'}>
                <Form onSubmit={submitRoomCode}>
                    <Form.Group controlId={roomCodeControlName}>
                        <Form.Control type={'input'} placeholder={'Room Code'} required />
                    </Form.Group>
                    <Button variant={'primary'} type={'submit'}>
                        {'Connect to room!'}
                    </Button>
                </Form>
            </Row>
        </Container>
    )
}

export default ConnectToRoom;