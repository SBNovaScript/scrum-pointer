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
        <Container className={'jumbotron'}>
            {channel ? <Redirect to='/room' /> : null}
            <Row xs={12} className={'justify-content-center mb-3'}>
               {`Hi ${name}! Please select an option:`} 
            </Row>
            <Row sm={12}className={'justify-content-center'}>
                    <Button variant={'outline-primary'} onClick={createNewRoom}>
                        {'Create a room'}
                    </Button>
                    <Button variant={'outline-primary'} onClick={connectToRoom}>
                        {'Connect to an existing room'}
                    </Button>   
                
            </Row>
            
        </Container>
    )
}

export default ModeSelect;