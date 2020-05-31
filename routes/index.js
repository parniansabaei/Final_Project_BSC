module.exports = function(app,passport){
    //Get Homepage
        app.get('/', function(req, res){
            res.render('homepage.html');
        });
    
    //welcome page after Login or Signup
        app.get('/welcome',isLoggedIn,(req,res)=>{
            console.log("req user",req.user);
            res.render('Personal.html',{
                user : req.user
            });
        });

    //Buy_avarez page 
    app.get('/avarez',isLoggedIn,(req,res)=>{
        res.render('Buy_avarez.html');
    });

    //Buy_charge_mobile page 
    app.get('/mobilecharge',isLoggedIn,(req,res)=>{
        res.render('Buy_charge_mobile.html');
    });

    // //change password page 
    // app.get('/changepass',isLoggedIn,(req,res)=>{
    //     res.render('change_password.html');
    // });

    //havale bank page 
    app.get('/havalebank',isLoggedIn,(req,res)=>{
        res.render('havale_bank.html');
    });

    //pay bills page 
    app.get('/paybills',isLoggedIn,(req,res)=>{
        res.render('Pay_bills.html');
    });    

    //shaba code page 
    app.get('/shabacode',isLoggedIn,(req,res)=>{
        res.render('shaba_code.html');
    });
   
// //success page 
//     app.get('/successpage',isLoggedIn,(req,res)=>{
//         res.render('success_page.html');
//     });
          
    // //satisfaction page
    app.get('/satisfaction',isLoggedIn,(req,res)=>{
        res.render('satisfaction.html');
    });

    //Login page
        app.get('/login',(req,res) => {
            res.render('Log_in.html')
        });
    
        app.post('/login',passport.authenticate('local-login',{
                successRedirect : '/welcome',
                failureRedirect : '/login',
                failureFlash: true
            }
        ));
    //Signup page
        app.get('/signup',(req,res) => {
            res.render('Open_account.html');
        })
    
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/welcome', // redirect to the secure profile section
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

 
    