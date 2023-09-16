const router = require('express').Router();

const { setListing, getListing, deleteListing } = require('../../controller/listing-controller');

router.route('/get').get(getListing);

router.route('/post').post(setListing);

router.route('/delete').delete(deleteListing);

module.exports = router;