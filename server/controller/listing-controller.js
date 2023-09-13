const { User, Listing, Item } = require('../model');


module.exports = {

    async setListing(req, res) {
        try {

            const descr = Object.values(req.body.pop())[0];
            const theOwner = Object.values(req.body.pop())[0];
            let haveWant = [];

            for (const property of Object.values(req.body)) {


                const idArray = await Promise.all(property.map(async (i) => {

                    console.log("this is i", i)

                    const findElem = i.enchantments.map((i) => {
                        return { $elemMatch: { property: i.property, value: i.value } }
                    });

                    console.log(findElem);


                    //always returns the item, only creates it if it doesnt already exist.
                    const theItem = await Item.findOneAndUpdate(

                        {
                            name: i.name,
                            rarity: i.rarity,
                            enchantments: { $all: findElem }
                        },

                        {
                            $setOnInsert: i
                        },
                        // programmatically make this in the method:

                        /*
                     {
                     
                         name: 'Longsword',
                         rarity: 'Rare',

                         
                         
                         enchantments: {
                             $all: [
                                 {
                                     $elemMatch: {
                                         property: "Strength",
                                         value: 1
                                     }
                                 },
                                 {
                                     $elemMatch: {
                                         property: "Resourcefulness",
                                         value: 2
                                     }
                                 }
                             ]
                         }

                         
                     },
                     {
                         $setOnInsert: {
                             name: 'Longsword',
                             rarity: 'Rare',
                             enchantments: [
                                 { property: 'Strength', value: 1 },
                                 { property: 'Resourcefulness', value: 2 }
                               ]
                         }
                     },

                     */
                        {
                            new: true,
                            upsert: true
                        });

                    console.log("theItem", theItem)
                    return theItem._id.toHexString();
                }));

                console.log("idArray", idArray);
                haveWant.push(idArray);
                console.log(haveWant);
            }

            const theListing = await Listing.create({
                user: req.session.user_id,
                owner: theOwner,
                have: haveWant[0],
                want: haveWant[1],
                description: descr
            });

            const theUser = await User.findOneAndUpdate(
                { _id: req.session.user_id },
                { $addToSet: { listings: theListing._id } }
            );

            // console.log("user",theUser);

            // console.log(theListing);
            res.status(200).json("check console log")

        } catch (err) {
            res.status(400).json(err);
        }
    },

    async getListing(req, res) {
        //TODO get listings

        //search criteria can be items, or an item-attribute
        //takes in item parameters, finds (if any) IDs that match or are similar
        //take those item IDs, and grab all listings that have those ID's in them (each listing is only listed once)
        //push those listings to an array and return the array
        try {

            // console.dir(req.body[1], { depth: null });

            // const x = await Item.find(req.body[1]);

            // console.log(x);
            let haveWant = [];
            for (const property of Object.values(req.body)) {
                const items = await Promise.all(property.map(async (i) => {

                    console.log(i.name);
                    const theItem = await Item
                        .aggregate([
                            { $match: { name: i.name } },

                            {
                                $addFields:
                                {
                                    commonalities:
                                    {
                                        $function:
                                        {
                                            body: function (db, req) {

                                                // const dbSet = new Set(db);
                                                // const reqSet = new Set(req);
                                                // return  [...dbSet].filter((i) => reqSet.has(i))

                                                return db.filter((i) => req.includes(i)).length
                                            },
                                            args: ["$enchantments.property", i.enchantments],
                                            lang: "js"
                                        }
                                    }
                                }
                            },
                            { $match: { commonalities: { $gt: 0 } } },
                            { $sort: { commonalities: -1 } },
                            { $project: { _id: 1, "commonalities": 1 } }
                        ]);
                    //console.log("theItem", theItem)
                    return theItem;
                }));
                //  console.log(items);
                haveWant.push(items.flat())
            }

            // console.log("items", items);

            console.log("this is haveWant", haveWant)
            // console.dir(haveWant, {depth: 4})

            //if any items matched their search then pull up the listings
            if (haveWant[0].length || haveWant[1].length) {
                //TODO: this will also likely need to be an aggregate, you want the highest # of haves and wants in the listing, descending order
                const listings = await Listing.find({
                    $or: [
                        {
                            have:
                            {
                                $in: haveWant[0]
                            }
                        },
                        {
                            want:
                            {
                                $in: haveWant[1]
                            }
                        }
                    ]

                }).populate('have want');

                console.log(listings.length)

                res.status(200).json(listings);
            } else {
                res.status(200).json("empty")
            }


            //TODO, you want to load similar items no matter what.

            /*
    
            TODO: your searches need to load similar items, with a logical priority.
            so your query needs to have an $or operator for rarity, starting at the user's searched rarity, 
            then by all others in descending order (maybe do ascending if they start at a lower rarity), then after that do by properties
    
            */




        } catch (err) {
            res.status(400).json(err);
        }

    },

    async updateListing(req, res) {
        //TODO update a listing
    },

    async deleteListing(req, res) {
        //TODO delete a listing
    },

    async setItem(req, res) {
        //TODO add an item
    }


}