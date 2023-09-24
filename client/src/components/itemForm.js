import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { itemRarity, itemProperties } from '../utils/items';

const ItemForm = ({ item, append, id, index }) => {

    //TODO: removing an item from the parent component always just deletes the last element of the ench array being mapped at the bottom of this component
    //TODO: may need to refactor with ench being a prop instead of being stateful in this component

    const [ench, setEnch] = useState([]);
    console.log("ench console log at the top of the component", ench);
    console.log("item.enchantments console log at the top of the component", item.enchantments);
    useEffect(() => {
        append(item, index, ench, id)
    }, [ench])

    return (
        <>
            <h4>{item.label} Settings:</h4>
            <h6>Rarity:</h6>
            <Select
                options={itemRarity}
                onChange={(e) => append(item, index, e, id)}
            />
            <h6>Enchantments:</h6>
            <Select
                options={itemProperties}
                isMulti={true}
                //TODO back-end for this
                isOptionDisabled={() => ench.length >= 6}
                onChange={(e) => {

                    setEnch((c) => {
                        //if youre deleting an enchantment
                        if (c.length > e.length) {
                            //this can probably be better
                            const newC = c.filter((i) => e.map(({ label }) => label).includes(i.property));
                            console.log("this is newC",newC);
                            return newC;
                        }
                        //if youre adding an enchantment
                        const newC = c.concat([{ property: e[e.length - 1].label }]);
                        return newC;
                    })
                }}
            />

            {/* this should be another component, but thats more prop drilling*/}
            {ench.map((i, j) => {
                console.log("THIS IS ALL OF ENCH",ench);
                console.log("THIS IS THE I BEING MAPPED FOR ENCHANTMENTS",i);
                return (
                    <div key={j}>
                        <p>{i.property}</p>
                        <input type='number' placeholder={`${i.property}`} onChange={(e) => {
                            setEnch((c) => {
                                c[j].value = parseInt(e.target.value);
                                return c;
                            })
                        }}
                        />
                    </div>
                )
            })}
        </>
    )
};


export default ItemForm;