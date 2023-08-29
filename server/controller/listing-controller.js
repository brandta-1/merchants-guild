const { User, Listing, Item } = require('../model');

module.exports = {

    async setListing(req, res) {
        //TODO let a user add a listing
    },

    async getListing(req, res) {
        //TODO get listings

        //search criteria can be items, or an item-attribute
        try {

            const theListing = await Listing.find(req.body);
            console.log(theListing);

            res.status(200).json(theListing);

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