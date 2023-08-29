const { User, Item, Listing } = require('../model');
const { connect, connection } = require('mongoose');

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

    await User.deleteMany({});

    const theUsers = [];

    for (let i = 0; i < 10; i++) {

        theUsers.push({
            username: names[i],
            password: pw,
        });
    }

    let currentUsers = await User.create(theUsers);
    console.table(currentUsers);
    console.info('Seeding complete! 🌱');
    process.exit(0);
}
)
