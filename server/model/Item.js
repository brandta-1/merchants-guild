const { Schema, model } = require('mongoose');
const { itemNames, itemProperties } = require('../utils/items');

const itemSchema = new Schema(
    {
        rarity: {
            type: String,
            enum: ['Uncommon', 'Rare', 'Epic', 'Legendary', 'Unique']
        },
        name: {
            type: String,
            enum: itemNames
        },
        enchantments: {
            property: {
                type: String,
                enum: itemProperties
            },
            value: {
                type: Number
            }
        }
    }
); 

const Item = model('Item', itemSchema);

module.exports = Item;
