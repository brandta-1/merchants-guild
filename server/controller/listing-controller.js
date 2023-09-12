const { User, Listing, Item } = require('../model');

module.exports = {

    async setListing(req, res) {
        try {

            const descr = Object.values(req.body.pop())[0];
            const theOwner = Object.values(req.body.pop())[0];
            let haveWant = [];

            for (const property of Object.values(req.body)) {

                const idArray = await Promise.all(property.map(async (i) => {
                    //always returns the item, only creates it if it doesnt already exist.
                    const theItem = await Item.findOneAndUpdate(i, {}, { new: true, upsert: true });
                    return theItem._id.toHexString();
                }));

                haveWant.push(idArray);
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

            const items = await Promise.all(req.body.map(async (i) => {
                const theItem = await Item.find(i, '_id');
                console.log("test",theItem);
                return theItem;
            }));

           

           console.log(items);

          

            if (items[0].length) {
                const listings = await Listing.find({
                    want: {
                        $in: items[0]
                    }
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