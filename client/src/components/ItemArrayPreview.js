import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import arrow from '../assets/arrows.png';
import ListGroup from 'react-bootstrap/ListGroup';
const ItemArrayPreview = ({ items, id }) => {



    return (
        <>
            <Col className="item-array">

                <ListGroup >
                    {items.map((i, j) => {

                        return (
                            <>
                                <ListGroup.Item className="item-block" border="secondary">
                                    <h4 className={i.rarity} key={j}>{i.name}</h4>

                                    {i.enchantments.map((k, l) => {
                                        return (
                                            <>
                                                {k.value ? (
                                                    <p>+{k.value} {k.property}</p>
                                                ) : (
                                                    <p>+{k.property}</p>
                                                )}
                                            </>
                                        )

                                    })}
                                </ListGroup.Item>
                            </>
                        )

                    })}

                </ListGroup>
            </Col>
            {!id &&
                <Col xs={2}>
                    <img src={arrow} className="arrow-icon" />
                </Col>
            }

        </>
    )



}



export default ItemArrayPreview;