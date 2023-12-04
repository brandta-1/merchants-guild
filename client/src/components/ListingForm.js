import React, { useState, useEffect } from 'react';
import ItemFormArray from './ItemFormArray';
import { v4 as uuidv4 } from 'uuid';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const ListingForm = ({ sendToNet, searching }) => {

    const [formState, setFormState] = useState([[], []]);

    const [name, setName] = useState();
    const [desc, setDesc] = useState();

    //TODO, many of the child stateful variables should be managed in this component and passed as props, this is a temporary workaround
    const [reset,setReset] = useState();


    function sendToParent() {

        if (!name && !searching) {
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


        //TODO: this could be more succinct, if searching, one can be empty, if not searching, none can be empty
        if (!searching && (!filteredArrays[0].length || !filteredArrays[1].length)) {
            alert("A posted listing must contain items you have and items you want")
            return;
        } else if (searching && (!filteredArrays[0].length && !filteredArrays[1].length)) {
            alert("Search form empty")
            return;
        }

        filteredArrays.push({ owner: name }, { description: desc });

        //console.log("sending this to server:", filteredArrays)

        if (searching) {
            filteredArrays.pop();
            filteredArrays.pop();
        }

        sendToNet(filteredArrays);
        setFormState([[], []]);
        setName('');
        setDesc('');
        setReset(uuidv4());
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
                        {/*TODO this needs spacing*/}
                        {!searching &&
                            <Col className="name-box">
                                <input type='text'
                                    value={name}
                                    className="name name-input"
                                    placeholder='Character name'
                                    onChange={(e) => setName(e.target.value)} />
                            </Col>
                        }
                    </Row>
                    {searching && <div><br></br></div>}
                    <Row className="align-items-center">
                        {formState.map((i, j) => {
                            return (
                                <ItemFormArray key={j} id={j} sendToForm={sendToForm} reset={reset} searching={searching}/>
                            )

                        })}
                    </Row>

                    {/*TODO this needs spacing*/}
                    {!searching &&
                        <>
                            <input className="desc" type='text'
                                value={desc}
                                placeholder='type the listing description here'
                                onChange={(e) => { setDesc(e.target.value) }} />
                            <br />
                        </>
                    }

                    {searching && <div><br></br></div>}

                    <button className="form-button" onClick={sendToParent}>
                        {searching ? "Search Listings" : "Create Listing"}
                    </button>

                    <div><br></br></div>

                </Card>
            </Container>
        </>
    )
}

export default ListingForm;