import React from 'react';
import { Container, Row, Button, Form } from 'react-bootstrap';
import client from '../../feathers';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';

const ConnectToRoom = () => {

    const roomCodeControlName = 'formRoomCode';
    const storedRoomCode = useSelector((state: any) => state.ChannelReducer.channel);

    const connectToNewRoom = (roomCode: string) => {
        client.service('channel').create({providedChannel: roomCode}).then((response: any) => {
            console.log(response);
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
        connectToNewRoom(form[roomCodeControlName].value);
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