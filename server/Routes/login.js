let express = require('express'),
    router = express.Router(),
    loginService = require('../Services/login'),
    path = require('path');

/* Customer Sign Up. */
router.post('/signup',(req, res) => {
    console.log("router signup",req.body);
    loginService.signup(req.body, (data) => {
        res.send(data);
    });
});

/* Customer Login. */
router.post('/login', (req, res) => {
    loginService.login(req.body, (data) => {
        res.send(data);
    });
});

/* Customer Favourites */
router.post('/favouriteAndHistory', (req, res) => {
    loginService.favouriteAndHistory(req.body, (data) => {
        res.send(data);
    });
});

/* Admin Forgot Password Reset. 
Consumes: application/json
Required: encrypted query
Produces: application/json
*/
router.post('/verifyForgot', (req, res) => {
    // console.log("verifyForgot request recieved----",req.query);
    loginService.verifyForgot(req.query, req.body, (data) => {
        res.send(data);
    });
});

/* Static About Us Page. 
Consumes: 
Produces: <HTML>
*/
router.get('/verifyForgot', function(req, res) {
    res.sendFile(path.resolve('HTMLs/reset.html'))
});

/* Forgot Password */
router.post('/forgotPassword', (req, res) => {
    loginService.forgotPassword(req.body, (data) => {
        res.send(data);
    });
});

/* Forgot Password */
router.post('/getHistory', (req, res) => {
    loginService.getHistory(req.body, (data) => {
        res.send(data);
    });
});



module.exports = router;
