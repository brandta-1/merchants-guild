import React, { useState, useEffect } from 'react';
import {
    Form, Button, Alert, Container,
    Card,
    Row,
    Col
} from 'react-bootstrap';
import Select from 'react-select';
import { itemNames } from '../utils/items';
import { setListing } from '../utils/API';
import ItemsForm from './ItemsForm';

const ListingForm = () => {

    const [formData, setFormData] = useState([[], []]);

    const [name, setName] = useState();
    const [desc, setDesc] = useState();

    //TODO: enforce component based heirarchy

    const sendForm = (e) => {
        e.preventDefault();
        if (!name || formData[0].length == 0 || formData[1].length == 0) {
            console.log("formdata", formData);
            alert("no name")
            return;
        }
        formData[2] = name;
        formData[3] = desc;
        // console.log("formdata", formData);
        console.log("about to send this to server:", formData)
        setListing(formData);
    }

    const formControl = (e, k, i, j) => {
        console.log("e", e, "i", i, "j", j, "k", k)

        if (!e.length) {
            if (!Array.isArray(i) && i !== undefined) {

                setFormData((c) => {
                    if (!!c[k][j]) {
                        c[k][j].rarity = i.value
                    }
                    return c;
                })

                return;
            } else if (Array.isArray(i) && (i.length || !!formData[k][j])) {
                setFormData((c) => {
                    c[k][j].enchantments = i;
                    return c;
                })
            }
            return
        }

        setFormData((currFormData) => {
            currFormData[k] = e;
            return currFormData;
        })

    }

    return (
        <>
            <div>
                <div>
                    <p>ListingForm</p>
                </div>

                <h1>create Listing</h1>

                {/* this needs to be mapped, not typed twice */}
                <div className="listing-form">
                    {formData.slice(0, 2).map((i, j) => {
                        return (
                            <div className="item-form">
                                <ItemsForm
                                    title={j == 0 ? 'Have:' : 'Want:'}
                                    options={itemNames}
                                    onChange={formControl}
                                    data={formData}
                                    key={j}
                                    index={j}
                                />
                            </div>
                        )
                    })}
                </div>


                <input type='text'
                    placeholder='Character name'
                    onChange={(e) => setName(e.target.value)} />
                <br />
                <input type='text'
                    placeholder='Listing description'
                    onChange={(e) => {
                        console.log(formData)
                        setDesc(e.target.value)
                    }} />
                <br />
                <button
                    onClick={(e) => sendForm(e)}>
                    Create New Listing
                </button>
            </div>
        </>
    )
};

export default ListingForm;