import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { itemRarity, itemProperties, itemNames } from '../utils/items';
import ListGroup from 'react-bootstrap/ListGroup';


const ItemForm = ({ theItem, deleteItem, id, sendToParent, index, length }) => {

    console.log(index);
    const [item, setItem] = useState();
    const [rarity, setRarity] = useState('Uncommon');
    const [ench, setEnch] = useState([]);
    const [numEnchs, setNumEnchs] = useState([0]);

    useEffect(() => {
        sendToParent(item, rarity, ench, id);
    }, [item, rarity, ench])

    const IRS = itemRarity.map((i) => i.label);



    const addItem = (e) => {
        setItem(e);
    }

    const addRarity = (e) => {
        setNumEnchs((c) => {
            const newC = IRS.slice(-IRS.indexOf(e) - 1);
            //if we are lowering the rarity, we need to delete any excess enchants the user may have created
            if (c.length > newC.length) {

                setEnch((curr) => {
                    const newCurr = curr.slice(0, curr.length - (c.length - newC.length))
                    return newCurr;
                })
            }
            return newC;
        })
        setRarity(e);
    }

    const addEnch = (e, j) => {
        setEnch((c) => {
            if (e) {
                c[j] = { property: e, value: 0 }
                return c;
            }
            c.splice(j, 1);
            return c;
        });
    }

    return (
        <>

            <ListGroup.Item className="item-block" border="secondary">


                <div className="item-box">
                    <Select
                        className="item-select"
                        options={itemNames}
                        placeholder={`Select Item`}
                        onChange={({ value }) => addItem(value)}

                    />

                    {item &&
                        <>
                            <Select
                                options={itemRarity}
                                placeholder={rarity}
                                onChange={({ value }) => addRarity(value)}

                            />
                            {numEnchs.map((i, j) => {
                                return (
                                    <div key={j}>

                                        <Select
                                            options={itemProperties}

                                            //prevent user from sending values without enchantments to the server
                                            //TODO this could be cleaner 
                                            onChange={(e) => {
                                                if (e) {
                                                    document.getElementById(`input-${id}-${j}`).disabled = false;
                                                } else {
                                                    document.getElementById(`input-${id}-${j}`).value = null;
                                                    document.getElementById(`input-${id}-${j}`).disabled = true;
                                                }
                                                addEnch(e ? e.value : 0, j)

                                            }}
                                            isClearable
                                        />
                                        <input
                                            id={`input-${id}-${j}`}
                                            type='number'
                                            disabled={true}
                                            className='item-select'
                                            onChange={({ target }) => {
                                                let value = parseInt(target.value);
                                                value = isNaN(value) ? 0 : value;
                                                setEnch((c) => {
                                                    c[j].value = value;
                                                    return c;
                                                })
                                            }}
                                        />
                                    </div>
                                )
                            })}
                        </>
                    }

                    {/* TODO may need to test this */}
                    {(index || length > 1) ? (
                        <button className="item-delete form-button" onClick={() => deleteItem(id)}>delete</button>
                    ) : (
                        null
                    )}

                </div>


            </ListGroup.Item>
        </>
    )
}


export default ItemForm;