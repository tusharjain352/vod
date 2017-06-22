let async = require('async'),
    queryString = require('querystring');

let util = require('../Utilities/util'),
    userDAO = require('../DAO/userDAO'),
    config = require("../Utilities/config").config;

let signup = (data, callback) => {
    async.auto({
        checkUserExist: (cb) => {
            if (!data.email) {
                cb(null, { "statusCode": util.statusCode.BAD_REQUEST, "statusMessage": util.statusMessage.PARAMS_MISSING })
                return;
            }
            var criteria = {
                email: data.email.toLowerCase()
            }
            userDAO.getUser(criteria, {}, {}, (error, user) => {
                if (error) {
                    cb(null, { "statusCode": util.statusCode.FIVE_ZERO_ZERO, "statusMessage": util.statusMessage.INTERNAL_SERVER_ERROR })
                    return;
                }
                if (user && user.length) {
                    cb(null, { "statusCode": util.statusCode.BAD_REQUEST, "statusMessage": util.statusMessage.USER_EXISTS });
                } else {
                    cb(null);
                }
            })
        },
        createNewUser: ['checkUserExist', (result, cb) => {
            if (result && result.checkUserExist) {
                cb(null, result.checkUserExist);
                return;
            }

            let customerData = {
                "name": data.name,
                "password": util.encryptString(data.password),
                "email": data.email,
                "phone": data.phone
            }

            userDAO.createUser(customerData, (error, data) => {
                if (error) {
                    cb(null, { "statusCode": util.statusCode.FIVE_ZERO_ZERO, "statusMessage": util.statusMessage.INTERNAL_SERVER_ERROR });
                    return;
                }

                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.USER_ADDED, result: true })
            })
        }]
    }, (error, response) => {
        console.log(response.createNewUser);
        callback(response.createNewUser);
    })
}

let login = (data, callback) => {
    async.auto({
        checkUserExist: (cb) => {
            if (!data.email || !data.password) {
                cb(null, { "statusCode": util.statusCode.BAD_REQUEST, "statusMessage": util.statusMessage.PARAMS_MISSING })
                return;
            }
            var criteria = {
                email: data.email.toLowerCase(),
                password: util.encryptString(data.password)
            }
            var projection = {
                email: 1,
                name: 1,
                phone: 1

            }
            var options = {
                lean: true
            }
            userDAO.getUser(criteria, projection, options, (error, user) => {
                if (error) {
                    cb(null, { "statusCode": util.statusCode.FIVE_ZERO_ZERO, "statusMessage": util.statusMessage.INTERNAL_SERVER_ERROR })
                }
                if (user && user.length) {
                    cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.AUTHENTICATED, result: user });
                } else {
                    cb(null, { "statusCode": util.statusCode.BAD_REQUEST, "statusMessage": util.statusMessage.USER_NOT_EXISTS });
                }
            })
        }
    }, (err, response) => {
        callback(response.checkUserExist);
    })
}

let favouriteAndHistory = (data, callback) => {
    async.auto({
        userActionFavourite: (cb) => {
            // console.log("user favourite api---",data);
            if (!data.userId || !data.videoId) {
                cb(null, { "statusCode": util.statusCode.BAD_REQUEST, "statusMessage": util.statusMessage.PARAMS_MISSING })
                return;
            }
            var criteria = {
                _id: data.userId
            }
            var dataToSet = {};
            if (data.hasOwnProperty('isFavourite')) {
                if (data.isFavourite == true) {
                    dataToSet['$addToSet'] = {
                        "favourite": data.videoId
                    }
                } else {

                    dataToSet['$pull'] = {
                        "favourite": data.videoId
                    }
                }
            } else {
                dataToSet['$addToSet'] = {
                    "history": {
                        'id': data.videoId,
                        'date': Date.now()
                    }
                }
            }


            userDAO.updateUser(criteria, dataToSet, {}, (error, user) => {
                // console.log("updated user--",user);
                if (error) {
                    cb(null, { "statusCode": util.statusCode.FIVE_ZERO_ZERO, "statusMessage": util.statusMessage.INTERNAL_SERVER_ERROR })
                }
                if (user) {
                    cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.FAVOURITE, result: true });
                } else {
                    cb(null, { "statusCode": util.statusCode.BAD_REQUEST, "statusMessage": util.statusMessage.USER_NOT_EXISTS });
                }
            })
        }
    }, function(error, response) {
        callback(response.userActionFavourite);
    })
}

//Method to reset password
let forgotPassword = (data, callback) => {
    async.auto({
        checkUserExistsinDB: (cb) => {
            //Module to check if user exists in database
            if (!data.email) {
                cb(null, { "statusCode": util.statusCode.BAD_REQUEST, "statusMessage": util.statusMessage.PARAMS_MISSING })
                return;
            }

            var criteria = {
                email: data.email.toLowerCase()
            }
            userDAO.getUser(criteria, {}, {}, (error, user) => {
                if (error) {
                    cb(null, { "statusCode": util.statusCode.FIVE_ZERO_ZERO, "statusMessage": util.statusMessage.INTERNAL_SERVER_ERROR })
                    return;
                }
                if (user && user.length) {
                    cb(null, { "statusCode": util.statusCode.BAD_REQUEST, "statusMessage": util.statusMessage.USER_EXISTS, "result": user });
                } else {
                    cb(null);
                }
            })
        },
        customLogic: ['checkUserExistsinDB', (functionData, cb) => {
            //Write your custom Logic here!!
            if (!functionData.checkUserExistsinDB.result) {
                cb(null, { "statusCode": util.statusCode.BAD_REQUEST, "statusMessage": util.statusMessage.EMAIL_NOT_EXISTS });
                return;
            }
            customForgotLogic(functionData.checkUserExistsinDB, data, cb);
        }]
    }, (err, response) => {
        //Send final Response
        callback(response.customLogic);
    })
}

let customForgotLogic = (dataFromDB, dataFromUser, cb) => {
    var OTP = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
    var uid = dataFromDB["result"][0]["_id"].toString();
    var encryptedData = util.encryptString(`userId=${uid}&otp=${OTP}&timestamp=${Date.now()}`);
    var criteria = {
        email: dataFromUser.email
    };

    var dataToSet = {
        "OTP_Active": true,
        "OTP": OTP
    }
    userDAO.updateUser(criteria, dataToSet, function(err, data) { console.log(err, data) });
    util.sendOPTviaMail({ OTP: `${config.NODE_SERVER_URL.url}:${config.NODE_SERVER_PORT.port}/login/verifyForgot?data=${encryptedData}`, email: dataFromUser["email"], subject: "Password Reset Link", text: `${config.NODE_SERVER_URL.url}:${config.NODE_SERVER_PORT.port}/login/verifyForgot?data=${encryptedData} Click on the link to reset your password. This password reset link is valid for next 7 days.` });
    cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.EMAIL_OTP_SENT });
}

let verifyForgot = (data, password, callback) => {
    async.auto({
        decryptedDataAndVerify: (cb) => {
            var decryptedData = {};
            try {
                decryptedData = util.decryptString(data.data);
                decryptedData = queryString.parse(decryptedData);
            } catch (e) {
                console.log(e);
                cb(null, "Some Error Occured!");
                return;
            }
            if (!decryptedData.userId || !decryptedData.timestamp) {
                // console.log(decryptedData);
                cb(null, "Some Error Occured!");
                return;
            }
            if (Date.now() - decryptedData.timestamp < 3600000) {
                var criteria = {
                    _id: decryptedData.userId,
                    OTP_Active: true,
                    OTP: decryptedData.otp
                };

                var dataToSet = {
                    "OTP_Active": false,
                    "Password": password.password
                }
                userDAO.updateUser(criteria, dataToSet, function(err, dbData) {
                    if (err) {
                        console.log(err);
                        cb(null, "Some Error Occured!");
                        return;
                    }
                    // console.log(dbData);
                    if (dbData) {
                        cb(null, "Password Changed");
                    } else {
                        cb(null, "Reset link already used.");
                    }

                });
            } else {
                cb(null, "Link Expired");
            }

        }
    }, (err, response) => {
        callback(response.decryptedDataAndVerify);
    });
}

let getHistory = (data, callback) => {
    async.auto({
        
        getUserHistory: (cb) => {
          console.log("getHistory00000000", data);
            if (!data.userId) {
                cb(null, { "statusCode": util.statusCode.BAD_REQUEST, "statusMessage": util.statusMessage.PARAMS_MISSING })
                return;
            }
            var criteria = {
                _id: data['userId']
            }
            var projection = {
                history: 1

            }
            var options = {
                lean: true
            }
            userDAO.getUser(criteria, projection, options, (error, user) => {
                if (error) {
                    cb(null, { "statusCode": util.statusCode.FIVE_ZERO_ZERO, "statusMessage": util.statusMessage.INTERNAL_SERVER_ERROR })
                }
                if (user && user.length) {
                    cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.AUTHENTICATED, result: user });
                } else {
                    cb(null, { "statusCode": util.statusCode.BAD_REQUEST, "statusMessage": util.statusMessage.USER_NOT_EXISTS });
                }
            })
        }
    }, function(error, response) {
        callback(response.getUserHistory)
    })

}

module.exports = {
    signup: signup,
    login: login,
    favouriteAndHistory: favouriteAndHistory,
    forgotPassword: forgotPassword,
    verifyForgot: verifyForgot,
    getHistory: getHistory
};
