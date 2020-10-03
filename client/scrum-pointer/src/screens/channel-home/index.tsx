import React, { useState, FormEvent } from 'react';
import { Container, Row, Col, Image, Form, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import client from '../../feathers';
import {Point, AllPoints, INVALID_POINT, INVALID_TITLE} from '../../constants';

const ChannelHome = () => {
    const channel = useSelector((state: any) => state.ChannelReducer.channel);
    const [channelInitialized, setChannelInitialized] = useState(false);

    const formControlPointsInput = 'formControlPointsInput';
    const formRadialInputs = 'formRadialInputs';
    const titleControlName = 'title';

    const [users, setUsers] = useState([]);
    const [pointValue, setPointValue] = useState(INVALID_POINT);

    const [pointAverage, setPointAverage] = useState(0);

    const submitPointValueDisabled = pointValue === INVALID_POINT;

    // Getting base info for the channel.
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

    // Logic for creating and updating the point value.
    const updatePointValue = (point: Point) => {
        setPointValue(point);
    }

    const submitPoints = (event: FormEvent<HTMLElement>) => {
        event.preventDefault();
        event.stopPropagation();
        
        client.service('pointing').create({pointValue, channel, title: 'test'}).then((response: any) => {
            console.log('Response received:', response);
            setChannelInitialized(true);
        })

        // Submit point value
        console.log(pointValue);
    }

    // Logic for creating the ticket title.
    const submitTitle = (event: any) => {
        event.preventDefault();
        event.stopPropagation();

        const form = event.currentTarget;
        if(form.checkValidity()){
            event.preventDefault();
            event.stopPropagation();
        }

        client.service('pointing').create({pointValue, channel, title: form[titleControlName].value}).then((response: any) => {
            console.log('Response received:', response);
            setChannelInitialized(true);
        })

        // Submit point value
        console.log(pointValue);
    }


    // Used when a title is needed for the given ticket.
    const ChannelTitleForm = () => (
        <Form onSubmit={submitTitle}>
            <Form.Group controlId={titleControlName}>
                <Form.Label className={'text-align-center'}>{'What is the title of the current ticket?'}</Form.Label>
                <Row className={'justify-content-center'}>
                    <Form.Control
                        type={'text'}
                        placeholder={'Enter Title'}
                    />
                </Row>
            </Form.Group>
            <Row className={'justify-content-center'}>
                <Button type={'submit'} disabled={false}>
                    {'Submit'}
                </Button>
            </Row>
        </Form>
    )

    // Used when a point value is needed for a given ticket.
    const PointSubmitForm = () => (
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
    );

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
                    {channelInitialized ?
                        <PointSubmitForm /> :
                        <ChannelTitleForm />
                    }
                </Row>
            </Container>
        </Container>
    )
}

export default ChannelHome;