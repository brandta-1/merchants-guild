const { Schema, model } = require('mongoose');
const { itemNames, itemRarity, itemProperties } = require('../utils/items');

const enchSchema = new Schema({
    property: {
        type: String,
        enum: itemProperties
    },
    value: {
        type: Number
    }
}, { _id: false })

const itemSchema = new Schema(
    {
        rarity: {
            type: String,
            enum: itemRarity
        },
        name: {
            type: String,
            enum: itemNames
        },
        enchantments: [enchSchema]
    }
);

const Item = model('Item', itemSchema);

module.exports = Item;

