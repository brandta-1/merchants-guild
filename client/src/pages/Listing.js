import React, { useState, useEffect } from 'react';
import { setListing, getListing } from '../utils/API';
import ListingForm from '../components/ListingForm';
import ListingPreview from '../components/ListingPreview';

//TODO you can come here if you aren't logged in

const Listing = () => {

    const [listings, setListings] = useState(null);

    useEffect(() => {
        if (listings) {
            console.log(listings);
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

        console.log("LISTING RES",res)

        if (res) {
            setListings((c) => {
                return [...c, res]
            });
        }
    }

    return (
        <>
            <p>Listing</p>

            <ListingForm sendToNet={sendToNet} searching={false}/>

            <h3>Active Listings:</h3>
            {console.log("LISTINGS STATE LISTING:",listings)}
            {listings &&
                <>

                    

                    {listings.map((i) => {
                        return (
                            
                                <ListingPreview listing={i} key={i._id} />
                            
                        )
                    })}


                </>
            }


        </>
    )
};

export default Listing;