const router = require('express').Router();

const { setListing, getListing } = require('../../controller/listing-controller');

router.route('/get').get(getListing);

router.route('/post').post(setListing);

module.exports = router;