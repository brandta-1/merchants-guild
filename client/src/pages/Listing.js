import React, { useState, useEffect } from 'react';
import { Navigate, Route } from 'react-router-dom'
import { setListing, getListing } from '../utils/API';
import ListingForm from '../components/ListingForm';
import ListingPreview from '../components/ListingPreview';
import Card from 'react-bootstrap/Card';



let x = 0;

const Listing = () => {

    const [listings, setListings] = useState(null);

    useEffect(() => {
        if (listings) {
            return
        }
        displayUser();
    }, [])

    const displayUser = async () => {
        const theUser = await getListing();
        setListings(theUser);
    }


    const sendToNet = async (form) => {

        const res = await setListing(form);

        if (res) {
            setListings((c) => {
                return [...c, res]
            });
        }
    }

    return (
        <>
            <p>Listing</p>

            <ListingForm sendToNet={sendToNet} />


            {listings &&
                <>

                    <h3>Active Listings:</h3>

                    {listings.map((i) => {
                        return (
                            <Card bg="dark">
                                <ListingPreview listing={i} key={i._id} />
                            </Card>
                        )
                    })}


                </>
            }


        </>
    )
};

export default Listing;