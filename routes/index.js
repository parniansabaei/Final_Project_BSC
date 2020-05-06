// var express = require('express');
// var router = express.Router();

// //Get Homepage
// router.get('/', function(req, res){
//     res.render('homepage.html');
// });
// module.exports = router;

module.exports = function(app,passport){
    //Get Homepage
        // app.get('/', function(req, res){
        //     res.render('homepage.html');
        // });
    
    //After Login or Signup
        app.get('/',isLoggedIn,(req,res)=>{
            console.log("req user",req.user);
            res.render('Personal.html',{
                user : req.user
            });
        });
    //Login page
        app.get('/login',(req,res) => {
            res.render('Log_in.html')
        });
    
        app.post('/login',passport.authenticate('local-login',{
                successRedirect : '/',
                failureRedirect : '/login',
                failureFlash: true
            }
        ));
    //Signup page
        app.get('/signup',(req,res) => {
            res.render('Open_account.html');
        })
    
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));
    //logout
        app.get('/logout', function(req, res) {
            req.logout();
            res.redirect('/');
        });
    
    
    // route middleware to make sure a user is logged in
        function isLoggedIn(req, res, next) {
    
            // if user is authenticated in the session, carry on 
            if (req.isAuthenticated())
                return next();
    
            // if they aren't redirect them to the home page
            res.redirect('/login');
        }
    }
    