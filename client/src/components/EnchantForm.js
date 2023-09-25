import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { itemRarity, itemProperties } from '../utils/items';

const EnchantForm = ({ item, append, id, index }) => {

    //TODO: removing an item from the parent component always just deletes the last element of the ench array being mapped at the bottom of this component
    //TODO: may need to refactor with ench being a prop instead of being stateful in this component

    const IRS = itemRarity.map((i)=>i.label);

    const [ench, setEnch] = useState([]);
    const [rare, setRare] = useState({value: 'Uncommon'});
    console.log("ench console log at the top of the component", ench);
    console.log("item.enchantments console log at the top of the component", item);
    useEffect(() => {
        append(item, index, ench, id)
    }, [ench]);

    useEffect(()=> {
        append(item, index, rare, id)
    }, [rare]);

    function enchLimit(){
       const test= IRS.indexOf(rare.value)+1;
       console.log("ENCH LIMIT TESST",test)
       return ench.length >= test;
    }

    enchLimit();

    return (
        <>
            <div className="item-properties">
                <div className="test-div">
                    <Select

                        options={itemRarity}
                        placeholder={`Select ${item.label} rarity`}
                        onChange={(e) => {
                            const old = IRS.indexOf(rare.value);
                            const next = IRS.indexOf(e.value);
                            if(next < old){
                                setEnch([])
                            }
                            console.log(old,next);
                            setRare(e)
                        }}
                    />
                </div>
                <div className="test-div">
                    <Select
                        placeholder={`Select ${item.label} enchantments`}
                        options={itemProperties}
                        isMulti={true}
                        value={ench.map((i)=>{return {label: i.property, value: i.property}})}
                        //TODO back-end for this
                        isOptionDisabled={()=>enchLimit()}
                        onChange={(e) => {
                            console.log("THIS IS E ONCHANGE HELLOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO",e)
                            setEnch((c) => {
                                //if youre deleting an enchantment
                                if (c.length > e.length) {
                                    //this can probably be better
                                    const newC = c.filter((i) => e.map(({ label }) => label).includes(i.property));
                                    console.log("this is newC", newC);
                                    return newC;
                                }
                                //if youre adding an enchantment
                                const newC = c.concat([{ property: e[e.length - 1].label }]);
                                return newC;
                            })
                        }}
                    />
                </div>
            </div>

            {/* this should be another component, but thats more prop drilling*/}
            {ench.map((i, j) => {
                console.log("THIS IS ALL OF ENCH", ench);
                console.log("THIS IS THE I BEING MAPPED FOR ENCHANTMENTS", i);
                return (
                    <div key={i.property}>
                        <p>{i.property}</p>
                        <input type='number' placeholder={`${i.property}`} onChange={(e) => {
                            console.log(e.target.value || 0);
                            setEnch((c) => {
                                c[j].value = parseInt(e.target.value || 0);
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

export default EnchantForm;