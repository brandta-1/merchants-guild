import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import EnchantForm from '../components/EnchantForm';

const Search = ({ options = [], onChange, data, index, title }) => {

    console.log("this is the data",data);

    const [selected, setSelected] = useState([]);

    useEffect(() => {
        // console.log("changing?");
        console.log(selected);
        if (!selected.length) {
            // console.log("no length");
            // console.log(data)
        }
        onChange(selected.map((i)=>{return {name: i.label}}), index)
    }, [selected])

    const handleChange = (e) => {
        const newSelected = e.map(i => ({ ...i, value: Math.random() * Math.random() }));
        console.log("newSelected",newSelected);
        setSelected(newSelected);

    };

    return (
        <>
            <h2>{title}</h2>
            <Select
                isMulti
                hideSelectedOptions={false}
                value={selected}
                onChange={handleChange}
                options={options.map(i => ({ ...i, av: i.value, value: Math.random() * Math.random() }))}
                //TODO: back-end for this
                isOptionDisabled={() => selected.length >= 8}
            />
            {selected.map((i, j) => {
                console.log("selected map",i)
                return (
                    <EnchantForm item={i} append={onChange} key={i.name} id={j} index={index} />
                )
            })}
        </>
    );
};

export default Search;