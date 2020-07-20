import React from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';

const ChannelHome = () => {
    const channel = useSelector((state: any) => state.ChannelReducer.channel);

    return (
        <Container>
            {'You are in channel ' + channel + '! 🎉'}
        </Container>
    )
}

export default ChannelHome;