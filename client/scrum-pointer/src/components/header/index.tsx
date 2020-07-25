import React from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';

const Header = () => {
    return (
        <Navbar expand={'md'} className={'navbar-dark bg-primary mb-5'}>
            <Navbar.Brand href="/">{'Scrum Pointer'}</Navbar.Brand>
            <Navbar.Toggle aria-controls={'basic-navbar-nav'}/>
            <Navbar.Collapse id={'basic-navbar-nav'} >
                <Nav className={'mr-auto'}>
                    <Nav.Link href={'/'} >{'Home'}</Nav.Link>
                    <Nav.Link href={'/select'}>{'Rooms'}</Nav.Link>
                    <Nav.Link href={'/faq'}>{'FAQ'}</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header;