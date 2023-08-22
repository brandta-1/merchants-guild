const express = require('express');
const session = require('express-session');
const { connect, connection } = require('mongoose');
const MongoDBStore = require('connect-mongodb-session')(session);

var store = new MongoDBStore({
    uri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/merch-guild',
    collection: 'mySessions'
});

store.on('error', function (error) {
    console.log(error);
});

app.use(session({
    secret: process.env.SESSION_SECRET || 'This is a secret',
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 3 // 3 days
    },
    store: store,
    resave: true,
    saveUninitialized: true
}));

const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/merch-guild';

connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

connection.once('open', () => {
    app.listen(PORT, () => {
        console.log(` running on port ${PORT}!`);
    });
});
