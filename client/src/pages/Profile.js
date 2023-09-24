import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import Select from 'react-select';

import { setListing } from '../utils/API';
import ListingForm from '../components/ListingForm';

const Profile = () => {

    return (
        <>

            <h1>Profile</h1>
            <ListingForm />
        </>
    )
};

export default Profile;