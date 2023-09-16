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
                res.status(400).json(err);
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
        //TODO update a user's password, may need to make a user login with their email instead of a username?
    },

    async deleteUser(req, res) {
        //TODO delete a user
    },

    async login(req, res) {

        const theUser = await User.findOne({ username: req.body.username });

        if (!theUser) {
            res.status(400).json("no user found with this email")
        }

        const pw = await theUser.isCorrectPassword(req.body.password);

        if (!pw) {
            res.status(400).json("wrong password")
        }

        req.session.save(() => {
            req.session.user_id = theUser._id.toHexString();
            req.session.logged_in = true;
            res.status(200).json({ user: theUser, message: 'You are now logged in!' });
        });
    }
}