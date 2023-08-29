const { Schema, model } = require('mongoose');

const listingSchema = new Schema(
    {
        user:
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        owner: {
            type: String
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