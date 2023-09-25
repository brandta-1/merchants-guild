import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import ItemForm from './ItemForm';
import { v4 as uuidv4 } from 'uuid';


const ListingForm = () => {

    const [items, setItems] = useState([]);

    const deleteItem = (id) => {
        console.log("deleted", id)

        setItems((c) => {

            const index = c.map((i) => i.id).indexOf(id);

            const test = c.toSpliced(index, 1)
            console.log(test);
            return test;
        });

    }

    const addItem = (e) => {
        console.log(e);

        setItems((c) => {

            return [...c, { name: undefined, rarity: 'Uncommon', enchantments: [], id: uuidv4() }]

        })
    }

    const sendToParent = (item, rarity, ench, id) => {

        console.log("item", item, "rarity", rarity, "ench", ench, "id", id)
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
            <h1>Item Form</h1>
            {items.map((i) => {
                return (
                    <ItemForm deleteItem={deleteItem} theItem={i} key={i.id} id={i.id} sendToParent={sendToParent} />
                )
            })}

            <button onClick={addItem}>add Another Item</button>


            <br></br>
            <button onClick={() => console.log(items)}>print items</button>
        </>
    )
}
export default ListingForm;