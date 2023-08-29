const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        ign: [
            {
                type: String
            }
        ],
        password: {
            type: String,
            required: true,
            min: 7,
        },

        listings: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Listing'
            }
        ]
    }
);

userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

userSchema.methods.isCorrectPassword = async function (password) {
    console.log(password);
    console.log(this.password);
    return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;