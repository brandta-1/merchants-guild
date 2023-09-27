import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';

import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';

import { isLoggedIn, logoutUser } from '../utils/API';



const { logged_in } = await isLoggedIn();

const AppNavbar = () => {

    // set modal display state
    const [showModal, setShowModal] = useState(false);
    const [redirect, setRedirect] = useState('/')

    const logout = async () => {
        await logoutUser();
        window.location.assign('/');
    }

    return (
        <>
            <Navbar bg='dark' variant='dark' expand='lg'>
                <Container fluid>
                    <Navbar.Brand as={Link} to='/'>
                        The Trader's Guild
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls='navbar' />
                    <Navbar.Collapse id='navbar' className='d-flex flex-row-reverse'>
                        <Nav className='ml-auto d-flex'>
                            <Nav.Link as={Link} to='/search'>
                                Search Listings
                            </Nav.Link>
                            {/* if user is logged in show saved books and logout */}
                            {logged_in ? (
                                <>
                                    <Nav.Link as={Link} to='/listing'>
                                        Create Listings
                                    </Nav.Link>
                                    <Nav.Link onClick={logout}>Logout</Nav.Link>
                                </>
                            ) : (
                                <>
                                    <Nav.Link onClick={() => {
                                        setRedirect('/listing')
                                        setShowModal(true)
                                        }}>Create Listings</Nav.Link>
                                    <Nav.Link onClick={() => setShowModal(true)}>Login</Nav.Link>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {/* set modal data up */}
            <Modal
                size='lg'
                show={showModal}
                redirect={redirect}
                onHide={() => setShowModal(false)}
                aria-labelledby='signup-modal'>
                {/* tab container to do either signup or login component */}
                <Tab.Container defaultActiveKey='login'>
                    <Modal.Header closeButton>
                        <Modal.Title id='signup-modal'>
                            <Nav variant='pills'>
                                <Nav.Item>
                                    <Nav.Link eventKey='login'>Login</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Tab.Content>
                            <Tab.Pane eventKey='login'>
                                <LoginForm redirect={redirect} handleModalClose={() => setShowModal(false)} />
                            </Tab.Pane>
                            <Tab.Pane eventKey='signup'>
                                <SignUpForm redirect={redirect} handleModalClose={() => setShowModal(false)} />
                            </Tab.Pane>
                        </Tab.Content>
                    </Modal.Body>
                </Tab.Container>
            </Modal>
        </>
    );
};

export default AppNavbar;