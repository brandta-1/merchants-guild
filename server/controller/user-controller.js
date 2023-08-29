const { User, Listing, Item } = require('../model');

module.exports = {

    async setUser(req, res) {

        try {
            console.log(req.body);

            const theUser = await User.create(req.body);

            req.session.save(() => {
                req.session.user_id = theUser.id;
                req.session.logged_in = true;
                res.status(200).json(theUser);
            });
        } catch (err) {

            if (err.code = 11000) {
                res.status(400).json({ message: "username taken" });
            } else {
                res.status(400).end();
            }
        }
    },

    async getUser(req, res) {
        //TODO get a user
    },

    async updateUser(req, res) {
        //TODO update a user
    },

    async deleteUser(req, res) {
        //TODO delete a user
    },

    async setIgn(req, res) {
        //TODO let a user add an in-game-name (ign) to their profile
    },

    async getIgn(req, res) {
        //TODO get an ign
    },

    async updateIgn(req, res) {
        //TODO update an ign
    },

    async deleteIgn(req, res) {
        //TODO delete an ign
    },

    async login(req, res) {
        //TODO let a user login
    }
}