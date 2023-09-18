import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import ItemForm from '../components/itemForm';

const Search = ({ options = [] }) => {
    const [selected, setSelected] = useState([]);

    const handleChange = (e) => {

        const newSelected = e.map(i => ({ ...i, value: Math.random() * Math.random() }));
        setSelected(newSelected);

    };
    return (
        <>

            <Select
                isMulti
                hideSelectedOptions={false}
                value={selected}
                onChange={handleChange}
                options={options.map(i => ({ ...i, av: i.value, value: Math.random() * Math.random() }))}
                isOptionDisabled={() => selected.length >= 8}
            />
            {selected.map((i) => {
                return (
                    <ItemForm item={i.label} />
                )
            })}


        </>
    );
};


export default Search;