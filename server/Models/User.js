var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let User = new Schema({
    name: {
        type: String,
        trim: true,
        default: null,
        required: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        select: false,
        required: true
    },
    phone: {
        type: String,
        trim: true,
        min: 8,
        max: 15
    },
    favourite:[],
    history:[{
        id:String,
        date:Number
    }]
});

User.index({
    email: 1
}, {
    unique: true
});

module.exports = mongoose.model('User', User);