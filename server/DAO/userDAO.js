'use strict';

var Models = require('../Models/User');

var updateUser = function(criteria, dataToSet, options, callback) {
    options.lean = true;
    options.new = true;
    Models.findOneAndUpdate(criteria, dataToSet, options, callback);
};

//Insert User in DB
var createUser = function(objToSave, callback) {
    new Models(objToSave).save(callback)
};
//Delete User in DB
var deleteUser = function(criteria, callback) {
    Models.findOneAndRemove(criteria, callback);
};

//Get Users from DB
var getUser = function(criteria, projection, options, callback) {
    options.lean = true;
    Models.find(criteria, projection, options, callback);
};

var getPopulatedUsers = function(criteria, limit, offset, projection, sortOptions, populate, callback) {
    Models.find(criteria).skip(offset).limit(limit).select(projection).populate(populate).sort(sortOptions).lean().exec(callback);
};

//Get User Count from DB
var getUserCount = function(criteria, callback){
    Models.count(criteria, callback);
}

module.exports = {
    updateUser: updateUser,
    createUser: createUser,
    deleteUser: deleteUser,
    getUser: getUser,
    getPopulatedUsers: getPopulatedUsers,
    getUserCount: getUserCount
}
