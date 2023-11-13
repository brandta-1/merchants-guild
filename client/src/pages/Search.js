import React, { useState, useEffect } from 'react';
import ListingForm from '../components/ListingForm';
import ListingPreview from '../components/ListingPreview';
import { getListing } from '../utils/API';

const Search = () => {

    const [listings, setListings] = useState(null);

    const sendToNet = async (form) => {

        console.log("sendtoNet form:", form)

        const res = await getListing(form);
        console.log("SEARCH RES", res)
        if (res) {
            setListings(res);
        }
    }

    return (
        <>
            <h1>Search</h1>

            <ListingForm sendToNet={sendToNet} searching={true} />
            {console.log("LISTINGS STATE SEARCH:", listings)}
            {listings &&
                <>

                    {listings == 'empty' ? (
                        <>
                            <h1>No listings found</h1>
                        </>
                    ) : (
                        <>
                            {listings.map((i) => {
                                return (

                                    <ListingPreview listing={i} key={i._id} />

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