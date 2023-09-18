import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import {itemRarity, itemProperties} from '../utils/items';

const ItemForm = ({ item }) => {
    console.log("ITEM FORM E", item);

    return (
        <>
            <h4>{item} Settings:</h4>
            <h6>Rarity:</h6>
            <Select 
            options={itemRarity}
            />
            <h6>Enchantments:</h6>
            <Select 
            options={itemProperties}
            isMulti={true}
            />
        </>
    )
};


export default ItemForm;