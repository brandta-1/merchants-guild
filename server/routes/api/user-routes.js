const router = require('express').Router();

const { setUser, getUser, login, requireAuth, logout } = require('../../controller/user-controller');

router.route('/').post(setUser);

router.route('/get').get(getUser);

router.route('/login').post(login);

router.route('/auth').get(requireAuth);

router.route('/logout').post(logout);

module.exports = router;