const router = require('express').Router();

const { setListing, getListing, deleteListing } = require('../../controller/listing-controller');

router.route('/get').post(getListing);

router.route('/post').post(setListing);

router.route('/delete').post(deleteListing);

module.exports = router;