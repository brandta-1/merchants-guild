const { Schema, model } = require('mongoose');

const listingSchema = new Schema(
    {
        owner:
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        have: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Item'
            }
        ],
        want: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Item'
            }
        ]
    }
);

const Listing = model('Listing', listingSchema);

module.exports = Listing;