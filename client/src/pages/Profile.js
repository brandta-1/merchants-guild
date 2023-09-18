import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { itemNames } from '../utils/items';
import Search from './Search';
console.log(itemNames);

const Profile = () => {

    return (
        <>
            <div>
                <p>Profile</p>
            </div>

            <h1>create Listing</h1>

            <h2>Have:</h2>
            <Search
                options={itemNames}
            />


        </>
    )
};

export default Profile;