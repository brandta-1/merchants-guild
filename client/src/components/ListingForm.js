import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import ItemForm from '../components/ItemForm';


const ListingForm = () => {



    const [numItems, setNumItems] = useState([0])
    const [items, setItems] = useState([0]);

    console.log("top of component state", items)

    const deleteItem = (id) => {
        console.log("deleted", id)

        setItems((c) => {

            const test = c.toSpliced(id, 1)
            console.log(test);
            return test;
        });

    }

    const sendToParent = (item, rarity, ench, id) => {

        // console.log(item, rarity, ench, id)
        setItems((c) => {
            c[id] = {
                name: item,
                rarity: rarity,
                enchantments: ench
            };
            return c;
        })

    }

    return (
        <>
            <h1>Item Form</h1>
            {items.map((i, j) => {
                console.log("THIS IS I",i)
                return (
                    <ItemForm deleteItem={deleteItem} key={i.name || j} id={j} sendToParent={sendToParent} />
                )
            })}

            <button onClick={() => setItems((c) => c.concat([0]))}>add Another Item</button>
        </>
    )
}
export default ListingForm;