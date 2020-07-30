import React from 'react';
import { Container, Row, Spinner } from 'react-bootstrap';

const FAQ = () => (
    <Container>
        <Row xs={12}>
            <h1>{'FAQ'}</h1>
        </Row>
        <Row xs={12}>
            <h3>{'This is the FAQ page.'}</h3>
        </Row>
        <Spinner animation={'grow'} variant={'secondary'} />
    </Container>
)

export default FAQ;