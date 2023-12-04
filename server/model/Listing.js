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
        ],
        description: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

const Listing = model('Listing', listingSchema);

module.exports = Listing;