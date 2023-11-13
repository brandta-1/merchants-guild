import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import ItemForm from './ItemForm';
import { v4 as uuidv4 } from 'uuid';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import arrow from '../assets/arrows.png';
import ListGroup from 'react-bootstrap/ListGroup';

const ItemFormArray = ({ sendToForm, id }) => {

    const [items, setItems] = useState([{ name: undefined, rarity: 'Uncommon', enchantments: [], id: uuidv4() }]);

    useEffect(() => {
        sendToForm(items, id);
    }, [items]);

    const deleteItem = (id) => {


        setItems((c) => {

            const index = c.map((i) => i.id).indexOf(id);

            const test = c.toSpliced(index, 1)

            return test;
        });

    }

    const addItem = (e) => {


        setItems((c) => {

            return [...c, { name: undefined, rarity: 'Uncommon', enchantments: [], id: uuidv4() }]

        })
    }

    const sendToParent = (item, rarity, ench, id) => {

        setItems((c) => {

            const index = c.map((i) => i.id).indexOf(id);

            c[index] = {
                ...c[index],
                name: item,
                rarity: rarity,
                enchantments: ench
            }

            return c;
        })

    }

    return (
        <>
            <Col className="item-array">
                <ListGroup >
                    {/* this could be more succinct if written in the parent component*/}
                    {!id ? (
                        <ListGroup.Item className="item-block form-title" border="secondary">
                            <p>Items You Have</p>
                        </ListGroup.Item>
                    ) : (
                        <ListGroup.Item className="item-block form-title" border="secondary">
                            <p>Items You Want</p>
                        </ListGroup.Item>
                    )}

                    {items.map((i,j) => {
                        return (
                            <ItemForm deleteItem={deleteItem} theItem={i} key={i.id} id={i.id} index={j} sendToParent={sendToParent} length={items.length} />
                        )
                    })}

                    <ListGroup.Item className="item-block" border="secondary">
                        <button className="form-button" onClick={addItem}>add item</button>
                    </ListGroup.Item>
                </ListGroup>



            </Col>
            {!id &&
                <Col xs={1}>
                    <img src={arrow} className="arrow-icon" />
                </Col>
            }
        </>
    )
}
export default ItemFormArray;