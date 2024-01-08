const { User, Listing, Item } = require('../model');
const mongoose = require("mongoose");
const util = require('util');
module.exports = {

    async setListing(req, res) {

        try {

            console.log("req body here", req.body);
            req.body[0].forEach((i) => console.log(" have enchantments", i.enchantments))
            req.body[1].forEach((i) => console.log(" want enchantments", i.enchantments))



            //pull description and owner data off the request
            const descr = Object.values(req.body.pop())[0];
            const theOwner = Object.values(req.body.pop())[0];
            let haveWant = [];

            const haveTest = req.body[0];
            const wantTest = req.body[1];

            console.log("haveTest :", haveTest);
            console.log("wantTest :", wantTest);

            for (const haveWant of [haveTest, wantTest]) {
                console.log("this is haveWant :", haveWant);
            }

            for (const property of Object.values(req.body)) {

                const idArray = await Promise.all(property.map(async (i) => {

                    console.log("this is i", i)
                    let theItem;

                    if (!i.enchantments.length) {

                        theItem = await Item.findOneAndUpdate(

                            {
                                name: i.name,
                                rarity: i.rarity,
                                enchantments: []
                            },

                            {
                                $setOnInsert: i
                            },
                            {
                                new: true,
                                upsert: true
                            });

                        return theItem._id.toHexString();
                    }
                    const findElem = i.enchantments.map((i) => {
                        return { $elemMatch: { property: i.property, value: i.value } }
                    });

                    //  console.log(findElem);
                    //always returns the item, only creates it if it doesnt already exist.
                    theItem = await Item.findOneAndUpdate(

                        {
                            name: i.name,
                            rarity: i.rarity,
                            enchantments: { $all: findElem }
                        },

                        {
                            $setOnInsert: i
                        },
                        {
                            new: true,
                            upsert: true
                        });

                    // console.log("theItem", theItem)
                    return theItem._id.toHexString();
                }));

                // console.log("idArray", idArray);
                haveWant.push(idArray);
                // console.log(haveWant);
            }



            const theListing = await Listing.create({
                user: req.session.user_id,
                owner: theOwner,
                have: haveWant[0],
                want: haveWant[1],
                description: descr
            });

            await theListing.populate('have want');
            res.status(200).json(theListing)

        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },

    async getListing(req, res) {

        try {

            if (!req.body[0]) {

                const args = [
                    {
                        $addFields:
                        {
                            ownership: true
                        }
                    },
                    {
                        $match: { user: new mongoose.Types.ObjectId(req.session.user_id) }
                    }
                ]
                const listings = await Listing.aggregate(args);
                await Item.populate(listings, { path: "have want" });
                console.log("here's listings", listings)
                return res.status(200).json(listings);
            }


            let haveWant = [];
            for (const property of Object.values(req.body)) {

                const items = await Promise.all(property.map(async (i) => {

                    const args = [
                        { $match: { name: i.name } }
                    ];
                    const theItem = await Item.aggregate(args);
                    console.log("theItem", theItem)
                    return theItem;
                }));
                haveWant.push(items.flat())
            }
            // console.log("this is haveWant", haveWant);
            //if any items matched their search then pull up the listings
            if (!(haveWant[0].length || haveWant[1].length)) {
                return res.status(200).json("empty")
            }

            const listings = await Listing.aggregate([
                {
                    $match: {
                        $or: [
                            { have: { $in: haveWant[0].map(i => i._id) } },
                            { want: { $in: haveWant[1].map(i => i._id) } }
                        ]
                    }
                },
                {
                    $addFields: {
                        ownership: { $in: ["$user", [new mongoose.Types.ObjectId(req.session.user_id)]] }
                    }
                },
                {
                    $lookup: {
                        from: "items",
                        localField: "have",
                        foreignField: "_id",
                        as: "Have"
                    }
                },
                {
                    $lookup: {
                        from: "items",
                        localField: "want",
                        foreignField: "_id",
                        as: "Want"
                    }
                },
                { $project: { "have": 0, "want": 0, __v: 0 } }
            ])

            console.log("this is listings", listings)
            return res.status(200).json(listings);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },

    async updateListing(req, res) {

        if (!req.body.user == req.session.user_id) {
            return res.status(401).json("ownership mismatch")
        }

        const theListing = Listing.findOneAndUpdate(req.body);

        return res.status(200).json(theListing);
    },

    async deleteListing(req, res) {
        try {

            console.log('TRYING DELETE')
            console.log(req.body);

            const listing = await Listing.find({ _id: req.body.id });
            console.log(listing);

            if (listing[0].user.toString() == req.session.user_id) {
                console.log("made it here")
                const theListing = await Listing.findOneAndDelete({ _id: req.body.id });
                console.log("deleted?");
                console.log(theListing);
                res.status(200).json(theListing);
            } else {
                res.status(403).json("error deleting item")
            }
        } catch (err) {
            res.status(400).json(err);
        }
    },
}