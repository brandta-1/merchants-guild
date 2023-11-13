import React, { useState, useEffect } from 'react';
import ItemArrayPreview from './ItemArrayPreview';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ListingPreview = ({ listing }) => {
    
    //TODO: this needs to come from DB
    const ts= new Date().toLocaleDateString();
    console.log("Listing Preview", listing);
    const { owner, description } = listing;
    console.log(owner,description)
   // console.log("description:", description);
    const items = [listing.have || listing.Have, listing.want || listing.Want];
    console.log(items);
    return (
        <>
            <Container className="item-container">
                <Card border="light" className="item-listing">
                    <Row>
                        <Col className="name-box">
                            <Card.Title className="name">{owner}</Card.Title>
                        </Col>
                        <Col className="time-stamp-box">
                            <Card.Title className="time-stamp">{ts}</Card.Title>
                        </Col>
                    </Row>



                    <Row className="align-items-center">
                        {items.map((i, j) => {
                            return (



                                <ItemArrayPreview items={i} key={j} id={j} />

                            )

                        })}
                    </Row>

                    {description &&
                        <Card.Text className="desc">{description}</Card.Text>
                    }

                </Card>
            </Container>
        </>
    )

}

export default ListingPreview;