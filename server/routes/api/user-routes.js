const router = require('express').Router();

const { setUser, getUser } = require('../../controller/user-controller');

router.route('/').post(setUser);

router.route('/get').get(getUser);

module.exports = router;