const { User, Listing, Item } = require('../model');
const uuid = require('../utils/uuid');

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
        
        try {
            //retrieves all users if the front-end does not specify a username
            const theUser = await User.find(req.body.username ? { username: req.body.username } : null);

            console.log(theUser);

            res.status(200).json(theUser)
        } catch (err) {
            res.status(400).json(err)
        }
    },

    async updateUser(req, res) {
        //TODO update a user
    },

    async deleteUser(req, res) {
        //TODO delete a user
    },

    async login(req, res) {
        //TODO let a user login
    }
}