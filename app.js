const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
require('dotenv').config();

//Init App
var app = express();

// Routes
require('./config/passport')(passport);
require('./routes/index')(app,passport);


//view Engine
//app.set('views', path.join(__dirname, 'view'));
app.engine('html', require('ejs').renderFile);
app.engine('handlebars', exphbs({defaultLayout: 'layout'}));
app.set('view engine', 'handlebars');

//style sheets
//app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())


const MONGODB_URI = process.env.MONGODB_URL;

mongoose.connect(MONGODB_URI,{ useNewUrlParser : true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('connected');
});

app.use(session({secret : 'ilearnnodejs'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./config/passport')(passport);
require('./routes/index')(app,passport);

//app.listen(3000);
const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));

// //index.html page
// app.get('/index', (req, res)=>{
//     res.sendFile(path.join(__dirname, 'index.html'));
// });

// //Log_in.html page
// app.get('/login', (req, res)=>{
//     res.sendFile(path.join(__dirname, 'Log_in.html'));
// });

// //open_account.html page
// app.get('/openaccount', (req, res)=>{
//     res.sendFile(path.join(__dirname, 'Open_account.html'));
// });

// //Buy_avarez.html page
// app.get('/avarez', (req, res)=>{
//     res.sendFile(path.join(__dirname, 'Buy_avarez.html'));
// });

// //Buy_charge_mobile.html page
// app.get('/mobilecharge', (req, res)=>{
//     res.sendFile(path.join(__dirname, 'Buy_charge_mobile.html'));
// });

// //change_password.html page
// app.get('/changepass', (req, res)=>{
//     res.sendFile(path.join(__dirname, 'change_password.html'));
// });

// //havale_bank.html page
// app.get('/havalebank', (req, res)=>{
//     res.sendFile(path.join(__dirname, 'havale_bank.html'));
// });

// //pay_bills.html page
// app.get('/paybills', (req, res)=>{
//     res.sendFile(path.join(__dirname, 'Pay_bills.html'));
// });

// //personal.html page
// app.get('/personal', (req, res)=>{
//     res.sendFile(path.join(__dirname, 'Personal.html'));
// });

// //shaba_code.html page
// app.get('/shaba', (req, res)=>{
//     res.sendFile(path.join(__dirname, 'shaba_code.html'));
// });

// //sorathesab.html page
// app.get('/sorathesab', (req, res)=>{
//     res.sendFile(path.join(__dirname, 'Sorat_hesab.html'));
// });

// //success_page.html page
// app.get('/changepass', (req, res)=>{
//     res.sendFile(path.join(__dirname, 'success_page.html'));
// });