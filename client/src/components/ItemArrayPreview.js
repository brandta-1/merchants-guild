import React, { useState, useEffect } from 'react';

const ItemArrayPreview = ({ items, id }) => {



    return (
        <>

            {items.map((i, j) => {

                return (
                    <>

                        <h5 className={i.rarity} key={j}>{i.name}</h5>

                        {i.enchantments.map((k, l) => {
                            return (
                                <p>+{k.value} {k.property}</p>
                            )

                        })}
                    </>
                )
            })}

            {!id &&
                <>
                    <p>{"<->"}</p>
                </>
            }
        </>
    )



}



export default ItemArrayPreview;