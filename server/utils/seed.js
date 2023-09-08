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

const pw = '0123456';

connection.once('open', async () => {
    console.log('connected');
    //await seedUsers();
    await seedItems();
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

async function seedItems() {

    await Item.deleteMany({});

    await Promise.all(
        itemRarity.map(async (i) => {
            return Item.create([{ rarity: i }])
        })
    )
}
