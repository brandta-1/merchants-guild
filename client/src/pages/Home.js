import React from 'react';
import picture from '../assets/merchants.jpg'
import Card from 'react-bootstrap/Card';

const Home = () => {
    return (
        <>

            <div className="home-page">
                <Card bg='dark'>
                    <Card.Img variant="top" src={picture}/>
                    <Card.Body>
                        <Card.Title>Welcome to The Trader's Guild</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the
                            bulk of the card's content.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        </>
    )
};

export default Home;