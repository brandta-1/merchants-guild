import React, { useState, useEffect } from 'react';
import ItemArrayPreview from './ItemArrayPreview';

const ListingPreview = ({ listing }) => {

    const { owner, description } = listing
    const items = [listing.have, listing.want];
    return (
        <>
            <div>
                <p>in-game name: {owner}</p>


                {items.map((i, j) => {
                    return (
                        <ItemArrayPreview items={i} key={j} id={j} />
                    )

                })}



            </div>
        </>
    )

}

export default ListingPreview;