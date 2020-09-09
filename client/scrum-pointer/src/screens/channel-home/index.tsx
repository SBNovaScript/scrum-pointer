import React, { useState, FormEvent } from 'react';
import { Container, Row, Col, Image, Form, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import client from '../../feathers';
import { Point, AllPoints, INVALID_POINT } from '../../constants';

const ChannelHome = () => {
    const channel = useSelector((state: any) => state.ChannelReducer.channel);

    const formControlPointsInput = 'formControlPointsInput';
    const formRadialInputs = 'formRadialInputs';

    const [users, setUsers] = useState([]);
    const [pointValue, setPointValue] = useState(INVALID_POINT);

    const [pointAverage, setPointAverage] = useState(0);

    const submitPointValueDisabled = pointValue === INVALID_POINT;

    const updatePointValue = (point: Point) => {
        setPointValue(point);
    }

    const submitPoints = (event: FormEvent<HTMLElement>) => {
        event.preventDefault();
        event.stopPropagation();
        
        client.service('pointing').update(pointValue).then((response: any) => {
            console.log('Response received:', response);
        })

        // Submit point value
        console.log(pointValue);
    }

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

    client.service('pointing').on('updated', (connectedChannel: any, connection: any) => {
        client.service('pointing').get(connectedChannel.channel).then((result: any) => {
            setPointAverage(result);
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
                                    {'?'}
                                </h5>
                            </Col>
                        </Row>
                        )}
                    </Container>
                    <Container className={'align-self-center'}>
                        <h1>
                            {pointAverage}
                        </h1>
                    </Container>
                </Row>
                <Row className={'justify-content-center'}>
                    <Form onSubmit={submitPoints}>
                        <Form.Group controlId={formControlPointsInput}>
                            <Form.Label className={'text-align-center'}>{'What point value would you assign this ticket?'}</Form.Label>
                            <Row className={'justify-content-center'}>
                                {AllPoints.map((point: Point) => 
                                    <Form.Check
                                        type={'radio'}
                                        label={point}
                                        name={formRadialInputs}
                                        id={formRadialInputs + point.toString()}
                                        key={point.toString()}
                                        className={'mr-3'}
                                        onClick={() => updatePointValue(point)}
                                    />
                                )}
                            </Row>
                        </Form.Group>
                        <Row className={'justify-content-center'}>
                            <Button type={'submit'} disabled={submitPointValueDisabled}>
                                {'Submit'}
                            </Button>
                        </Row>
                    </Form>
                </Row>
            </Container>
        </Container>
    )
}

export default ChannelHome;