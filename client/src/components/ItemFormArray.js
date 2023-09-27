import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import ItemForm from './ItemForm';
import { v4 as uuidv4 } from 'uuid';


const ItemFormArray = ({sendToForm,id}) => {

    const [items, setItems] = useState([0]);

    useEffect(()=>{
        sendToForm(items,id);
    },[items]);

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
            <h1>Item Form</h1>
            {items.map((i) => {
                return (
                    <ItemForm deleteItem={deleteItem} theItem={i} key={i.id} id={i.id} sendToParent={sendToParent} />
                )
            })}

            <button onClick={addItem}>add Another Item</button>


            <br></br>
            
        </>
    )
}
export default ItemFormArray;