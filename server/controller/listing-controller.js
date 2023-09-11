const { User, Listing, Item } = require('../model');

module.exports = {

    async setListing(req, res) {
        //TODO let a user add a listing
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

            console.log(theListing);
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

            const items = await Promise.all(req.body.map(i => {

            }));

            res.status(200).json("check console log");

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