const router = require('express').Router();

const { setUser } = require('../../controller/user-controller');

router.route('/').post(setUser);

module.exports = router;