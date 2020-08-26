const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({

    cnic: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true


    },

    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    profile: {
        userName: {
            type: String,

        },  
         fName: {
            type: String,

        },
        city: {
            type: String,

        },
        gender: {
            type: String,

        },
        program: {
            type: String,

        },
        image: {
            type: String
        },
    }
});


module.exports = User = mongoose.model('user', UserSchema); 