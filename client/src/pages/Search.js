import React, { useState, useEffect } from 'react';
import ListingForm from '../components/ListingForm';
import ListingPreview from '../components/ListingPreview';
import { getListing, deleteListing } from '../utils/API';

const Search = () => {

    const [listings, setListings] = useState(null);

    const sendToNet = async (form) => {



        const res = await getListing(form);

        if (res) {
            setListings(res);
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
            <ListingForm sendToNet={sendToNet} searching={true} />
            {console.log("LISTINGS STATE SEARCH:", listings)}
            {listings &&
                <>
                    <h3 className="results">Found {Array.isArray(listings) ? listings.length : 0} Listin{listings.length == 1 ? 'g' : 'gs'}:</h3>
                    <div><br></br></div>
                    {listings == 'empty' ? (
                        <>
                            <h1>No listings found</h1>
                        </>
                    ) : (
                        <>
                            {listings.map((i) => {
                                return (

                                    <ListingPreview listing={i} key={i._id} removeListing={removeListing} />

                                )
                            })}
                        </>
                    )}




                </>
            }
        </>

    )
}
export default Search;