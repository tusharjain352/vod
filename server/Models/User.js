var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let User = new Schema({
    name: {
        type: String,
        trim: true,
        default: null,
        required: true
    },
    /*userImage: {
        type: String,
        trim: true,
        default: null
    },*/
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
    }/*,
    OTPActive: {
        type: Boolean,
        default: false
        
    },
    OTP: {
        type: String,
        default: null
        
    }*/
});

User.index({
    email: 1
}, {
    unique: true
});

User.index({
    'name': 'text',
    'email': 'text'
}, {
    "default_language": "en",
    "language_override": "en"
})

module.exports = mongoose.model('User', User);