import React, { useState, useEffect } from 'react';
import { setListing, getListing, deleteListing } from '../utils/API';
import ListingForm from '../components/ListingForm';
import ListingPreview from '../components/ListingPreview';

//TODO you can come here if you aren't logged in

const Listing = () => {

    const [listings, setListings] = useState([]);

    useEffect(() => { displayUser() }, [])

    const displayUser = async () => {
        const theUser = await getListing();
        setListings(theUser);
    }


    const sendToNet = async (form) => {
        console.log("sendToNet :", form)
        const res = await setListing(form);

        if (res) {
            setListings((c) => {
                //TODO properly implement this on setListing 
                Object.assign(res, { ownership: true })
                if (c == []) {
                    return [res]
                }
                return [...c, res]
            });
        }
    }

    const removeListing = async (id) => {
        deleteListing(id)
            .then(() => {
                setListings(listings.filter(i => i._id !== id))
            })
            .catch(() => {
                console.log("delete failed")
            });
    }

    return (
        <>
            <div><br></br></div>

            <ListingForm sendToNet={sendToNet} searching={false} />

            {(Array.isArray(listings) && listings.length > 0) &&
                <>
                    <h3 className="results">Your Active Listings:</h3>
                    <div><br></br></div>

                    {listings.map((i) => {
                        return (

                            <ListingPreview listing={i} key={i._id} removeListing={removeListing} />

                        )
                    })}
                </>
            }
        </>
    )
};

export default Listing;