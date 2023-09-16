const router = require('express').Router();

const { setUser, getUser, login } = require('../../controller/user-controller');

router.route('/').post(setUser);

router.route('/get').get(getUser);

router.route('/login').post(login);

module.exports = router;