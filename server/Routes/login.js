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
router.post('/favourite', (req, res) => {
    loginService.favourite(req.body, (data) => {
        res.send(data);
    });
});

/* Customer History */
/*router.post('/history', (req, res) => {
    loginService.history(req.body, (data) => {
        res.send(data);
    });
});*/

// router.get('/verifyForgot', function(req, res) {
//     res.sendFile(path.resolve('html/reset.html'))
// });

/* Forgot Password */
router.post('/forgotPassword', (req, res) => {
    loginService.forgotPassword(req.body, (data) => {
        res.send(data);
    });
});




module.exports = router;
