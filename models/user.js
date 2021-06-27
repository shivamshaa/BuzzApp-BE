const mongoose = require("mongoose")
const uniqueValidator = require('mongoose-unique-validator');
const UserSchema = new mongoose.Schema({
    googleId: {
        type: String
    },
    username: {
        type: String
    },
    email: {
        type: String,
        max: 50,
        unique: true
    },
    password: {
        type: String,
        min: 6
    },
    name: {
        type: String,
    },
    gender: {
        type: String,
        default: ""
    },
    designation: {
        type: String,
        default: ""
    },
    profilePicture: {
        type: String,
        default: ""
    },
    website: {
        type: String,
        default: ""
    },
    birthday: {
        type: Date
    },
    friends: {
        type: Array,
        default: []
    },
    friendRequests: {
        incoming: { type: Array, default: [] },
        outgoing: { type: Array, default: [] }
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    city: {
        type: String,
        max: 50
    },
    state: {
        type: String,
        max: 50
    },
    pin: {
        type: Number
    }


},
    { timestamps: true }
);
UserSchema.plugin(uniqueValidator, {
    type: 'mongoose-unique-validator',
    message: 'Error, expected {PATH} to be unique.'
});
module.exports = mongoose.model("User", UserSchema);