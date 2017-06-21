let config = require("./config").config,
    nodemailer = require("nodemailer"),
    crypto = require('crypto');

let encryption = {
    algorithm: 'aes-256-ctr',
    password: 'de_9!$6F-3E3fSW@123eq2d!!'
}


// Define Error Codes
let statusCode = {
    ZERO: 0,
    ONE: 1,
    TWO: 2,
    THREE: 3,
    FOUR: 4,
    FIVE: 5,
    SIX: 6,
    SEVEEN: 7,
    EIGHT: 8,
    NINE: 9,
    TEN: 10,
    OK: 200,
    FOUR_ZERO_FOUR: 404,
    BAD_REQUEST: 404,
    FIVE_ZERO_ZERO: 500,
    CUSTOM_ERROR: 403
};

// Define Error Messages
let statusMessage = {
    PARAMS_MISSING: 'Mandatory Fields Missing',
    SERVER_BUSY: 'Our Servers are busy. Please try again later.',
    PAGE_NOT_FOUND: 'Page not found', //404
    INTERNAL_SERVER_ERROR: 'Internal server error.', //500
    SOMETHING_WENT_WRONG: 'Something went wrong.',
    FETCHED_SUCCESSFULLY: 'Fetched Data Successfully.',
    UPLOAD_SUCCESSFUL: 'Uploaded Image Successfully.',
    DELETE_SUCCESSFUL: 'Deleted Image Successfully.',
    EXPENSE_ADDED: "Added Expenses Successfully",
    USER_ADDED: "User created successfully.",
    AUTHENTICATED: "Authenticated successfully.",
    FAVOURITE:"Added into favourites",
    UPDATED_SUCCESSFULLY: "User updated successfully.",
    USER_EXISTS: "User already exists for provided username.",
    USER_NOT_EXISTS: "Account does not exist, please contact your HR manager.",
    ADMIN_NOT_EXISTS: "Please enter valid username and password.",
    EMAIL_NOT_EXISTS: "Please enter valid username.",
    USER_INCORRECT_DETAILS: "The Staff Name/NRIC is incorrect. Please enter correct name or enter NRIC number.",
    INCORRECT_AUTH: "Incorrect authentication value.",
    EMAIL_OTP_SENT: "OTP sent to registered email id.",
    VALUE_MISSING: "Value Required For Key"
};


let mailModule = nodemailer.createTransport({
    "host": 'smtp.gmail.com',
    "port": 465,
    "secure": true,
    "auth": {
        "user": 'bccicca@gmail.com',
        "pass": 'Bcc!1234'
    }
});

let sendOPTviaMail = (data) => {
    var mailOptions = {
        from: '"Accedeo " <bccicca@gmail.com>',
        to: data.email,
        subject: data.subject,
        text: data.text
    };
    mailModule.sendMail(mailOptions);
}

let convertMinutesToMiliseconds = (minutes) => {
    return (parseInt(minutes) * 60 * 1000)
}

var encryptString = function(text) {
    var cipher = crypto.createCipher(encryption.algorithm, encryption.password)
    var crypted = cipher.update(text, 'utf8', 'hex')
    crypted += cipher.final('hex');
    return crypted
}

var decryptString = function decrypt(text) {
    var decipher = crypto.createDecipher(encryption.algorithm, encryption.password)
    var dec = decipher.update(text, 'hex', 'utf8')
    dec += decipher.final('utf8');
    return dec;
}

module.exports = {
    statusCode: statusCode,
    statusMessage: statusMessage,
    encryptString: encryptString,
    decryptString: decryptString,
    convertMinutesToMiliseconds: convertMinutesToMiliseconds,
    sendOPTviaMail: sendOPTviaMail
}