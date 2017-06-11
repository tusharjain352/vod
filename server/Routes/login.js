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


// router.get('/verifyForgot', function(req, res) {
//     res.sendFile(path.resolve('html/reset.html'))
// });

// /* Change Password */
// router.post('/changepassword', (req, res) => {
//     loginService.changepassword(req.body, (data) => {
//         res.send(data);
//     });
// });




module.exports = router;
