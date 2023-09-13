const { User, Item, Listing } = require('../model');
const { connect, connection } = require('mongoose');
const { itemRarity } = require('../utils/items');

const connectionString =
    process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/merch-guild';

connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});



connection.on('error', (err) => err);

const names = [
    'username 0',
    'username 1',
    'username 2',
    'username 3',
    'username 4',
    'username 5',
    'username 6',
    'username 7',
    'username 8',
    'username 9',
]

const exampleItems = [
    {
        rarity: "Legendary",
        name: "Arming Sword",
        enchantments: [
            {
                property: "Magical Healing",
                value: 1
            }
        ]
    },
    {
        rarity: "Rare",
        name: "Falchion",
        enchantments: [
            {
                property: "Agility",
                value: 2
            },
            {
                property: "Knowledge",
                value: 3
            }
        ]
    }
]

const pw = '0123456';

connection.once('open', async () => {
    console.log('connected');
    //await seedUsers();
    await seedItems(exampleItems);
    
    console.info('Seeding complete! 🌱');
    process.exit(0);
}
)

async function seedUsers() {

    await User.deleteMany({});

    const theUsers = [];

    names.forEach(i => {

        theUsers.push({
            username: names[i],
            password: pw,
        });
    })

    let currentUsers = await User.create(theUsers);
    console.table(currentUsers);
}

async function seedItems(x) {

    await Item.deleteMany({});

    

    let testarray = await Promise.all(
        x.map(async (i) => {
            console.log(i);
            return Item.create(i)
        })
    );

    console.log(testarray);
}


