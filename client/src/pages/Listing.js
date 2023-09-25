import React from 'react';

import { setListing } from '../utils/API';
import ListingForm from '../components/ListingForm';

const Listing = () => {


    const sendToNet = (form) => {
      
        console.log(form);


    }

    return (
        <>


            <p>Listing</p>

            <ListingForm sendToNet={sendToNet} />

        </>
    )
};

export default Listing;