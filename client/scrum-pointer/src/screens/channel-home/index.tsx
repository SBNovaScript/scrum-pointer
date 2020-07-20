import React from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const ChannelHome = () => {
    const channel = useSelector((state: any) => state.ChannelReducer.channel);

    return (
        <Container>
            {'You are in channel ' + channel + '! 🎉'}
        </Container>
    )
}

export default ChannelHome;