import React, { useState, useEffect } from 'react';
import ItemArrayPreview from './ItemArrayPreview';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ListingPreview = ({ listing, removeListing }) => {
    
    //TODO: this needs to come from DB
    
    const { owner, description, createdAt, ownership, _id } = listing;
    const ts = new Date(createdAt).toLocaleDateString();
    // console.log("description:", description);
    const items = [listing.have || listing.Have, listing.want || listing.Want];

    return (
        <>
            <Container className="item-container">
                <Card border="light" className="item-listing">
                    <Row>
                        <Col className="name-box">
                            <Card.Title className="name">
                                <span className="label">Owner:</span> {owner}
                                {ownership && <button className="delete-button label" onClick={() => removeListing(_id)}>Remove listing</button>}
                            </Card.Title>
                        </Col>

                        <Col className="time-stamp-box">
                            <Card.Title className="time-stamp"><span className="label">Date listed:</span>{ts}</Card.Title>
                        </Col>
                    </Row>

                    <Row className="align-items-center">
                        {items.map((i, j) => {
                            return (<ItemArrayPreview items={i} key={j} id={j} />)
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