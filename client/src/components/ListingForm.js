import React, { useState, useEffect } from 'react';
import ItemFormArray from './ItemFormArray';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const ListingForm = ({ sendToNet }) => {

    const [formState, setFormState] = useState([[], []]);

    const [name, setName] = useState();
    const [desc, setDesc] = useState();


    function sendToParent() {

        if (!name) {
            alert("Enter the name of the character that has the items, as it appears in-game, in `Character Name`");
            return;
        }


        const filteredArrays = formState.map((i) => {
            const filtered = i.filter(({ name }) => name)
                .map(({ name, rarity, enchantments }) => {
                    enchantments = enchantments.filter(n => n)
                    return { name, rarity, enchantments }
                });
            return filtered;
        });



        if (!filteredArrays[0].length || !filteredArrays[1].length) {
            alert("A posted listing must contain items you have and items you want")
            return;
        }

        filteredArrays.push({ owner: name }, { description: desc });

        //console.log("sending this to server:", filteredArrays)

        sendToNet(filteredArrays);
    }

    const sendToForm = (data, index) => {
        setFormState((c) => {
            c[index] = data
            return c;
        })
    }

    return (
        <>

            <Container className="item-container">
                <Card border="light" className="item-listing">
                    <Row>
                        <Col className="name-box">
                            <input type='text'
                                className="name name-input"
                                placeholder='Character name'
                                onChange={(e) => setName(e.target.value)} />
                        </Col>
                    </Row>
                    <Row className="align-items-center">
                        {formState.map((i, j) => {
                            return (
                                <ItemFormArray key={j} id={j} sendToForm={sendToForm} />
                            )

                        })}
                    </Row>


                    <input className="desc" type='text'
                        placeholder='type the listing description here'
                        onChange={(e) => { setDesc(e.target.value) }} />
                    <br />

                    <button className="form-button" onClick={sendToParent}>create listing</button>

                </Card>
            </Container>
        </>
    )
}

export default ListingForm;