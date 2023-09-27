import React, { useState, useEffect } from 'react';
import ItemFormArray from './ItemFormArray';

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
                    return { name, rarity, enchantments }
                });
            return filtered;
        });

      

        if (!filteredArrays[0].length || !filteredArrays[1].length) {
            alert("A posted listing must contain items you have and items you want")
            return;
        }

        filteredArrays.push({ owner: name }, { description: desc });


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

            {formState.map((i, j) => {
                return (
                    <ItemFormArray key={j} id={j} sendToForm={sendToForm} />
                )

            })}

            <input type='text'
                placeholder='Character name'
                onChange={(e) => setName(e.target.value)} />
            <br />
            <input type='text'
                placeholder='Listing description'
                onChange={(e) => { setDesc(e.target.value) }} />
            <br />

            <button onClick={sendToParent}>print items</button>
        </>
    )
}

export default ListingForm;