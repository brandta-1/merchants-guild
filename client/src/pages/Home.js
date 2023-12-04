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
                            To see update progress, please visi the GitHub repository: https://github.com/brandta-1/merchants-guild
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        </>
    )
};

export default Home;