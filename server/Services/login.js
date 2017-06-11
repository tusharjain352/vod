let async = require('async');

let util = require('../Utilities/util'),
    userDAO = require('../DAO/userDAO');

let signup = (data, callback) => {
	async.auto({
		checkUserExist:(cb)=>{
			if (!data.email) {
                cb(null, { "statusCode": util.statusCode.BAD_REQUEST, "statusMessage": util.statusMessage.PARAMS_MISSING })
                return;
            }
			var criteria = {
				email:data.email.toLowerCase()
			}
			userDAO.getUser(criteria,{},{},(error,user)=>{
				if(error){
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
		createNewUser:['checkUserExist',(result,cb)=>{
			if(result && result.checkUserExist){
				cb(null, result.checkUserExist);
				return;
			}

			let customerData = {
                "name": data.name,
                "password": util.encryptString(data.password),
                "email": data.email,
                "phone": data.phone
            }

            userDAO.createUser(customerData,(error,data)=>{
            	if(error){
            		cb(null, { "statusCode": util.statusCode.FIVE_ZERO_ZERO, "statusMessage": util.statusMessage.INTERNAL_SERVER_ERROR });
            		return;
            	}

            	cb(null,{"statusCode":util.statusCode.OK,"statusMessage":util.statusMessage.USER_ADDED,result:true})
            })
		}]
	},(error,response)=>{
		console.log(response.createNewUser);
		callback(response.createNewUser);
	})
}

let login = (data, callback) => {
	async.auto({
		checkUserExist:(cb)=>{
			if(!data.email || !data.password){
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
			userDAO.getUser(criteria,projection,options,(error,user)=>{
				if(error){
					cb(null, { "statusCode": util.statusCode.FIVE_ZERO_ZERO, "statusMessage": util.statusMessage.INTERNAL_SERVER_ERROR })
				}
				if (user && user.length) {
                    cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.AUTHENTICATED, result: true });
                } else {
                    cb(null, { "statusCode": util.statusCode.BAD_REQUEST, "statusMessage": util.statusMessage.USER_NOT_EXISTS });
                }
			})
		}
	},(err,response)=>{
		callback(response.checkUserExist);
	})
}


module.exports = {
    signup: signup,
    login: login
};
