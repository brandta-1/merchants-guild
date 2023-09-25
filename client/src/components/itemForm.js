import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { itemRarity, itemProperties, itemNames } from '../utils/items';


const ItemForm = ({ theItem, deleteItem, id, sendToParent }) => {

    const [item, setItem] = useState();
    const [rarity, setRarity] = useState('Uncommon');
    const [ench, setEnch] = useState([]);

    useEffect(() => {
        console.log("is this running????")
        sendToParent(item, rarity, ench, id);
    }, [item, rarity, ench])

    console.log(theItem);

    // console.log("this is ench state", ench)

    const IRS = itemRarity.map((i) => i.label);

    const enchants = IRS.slice(-IRS.indexOf(rarity) - 1);


    const addItem = (e) => {
        //   console.log("this is the item", e);
        setItem(e);
    }

    const addRarity = (e) => {
        // console.log("this is the rarity", e);
        setRarity(e);
    }

    const addEnch = (e, j) => {
        // console.log("this is the ench", e);
        setEnch((c) => {
            c[j] = { property: e, value: 0 }
            return c;
        });
    }



    return (
        <div className="item-box">
            <Select
                className="item-select"
                options={itemNames}
                placeholder={`Select Item ${id + 1}`}
                onChange={({ value }) => addItem(value)}

            />

            {item &&
                <>
                    <Select
                        options={itemRarity}
                        placeholder={rarity}
                        onChange={({ value }) => addRarity(value)}

                    />
                    {enchants.map((i, j) => {
                        return (
                            <div key={j}>
                                <Select
                                    options={itemProperties}
                                    onChange={({ value }) => addEnch(value, j)}
                                />

                                <input
                                    type='number'
                                    onChange={({ target }) => {
                                        let value = parseInt(target.value);
                                        value = isNaN(value) ? 0 : value;
                                        // console.log("this is the number", value);
                                        // console.log("this is the index", j);
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

            <button className="item-delete" onClick={() => deleteItem(id)}>delete item</button>
        </div>
    )
}


export default ItemForm;