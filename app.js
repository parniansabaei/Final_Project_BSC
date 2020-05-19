const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

//var mongodb = require('mongodb');


require('dotenv').config();

//Init App
var app = express();

//view Engine
app.set('views', path.join(__dirname, 'view'));
app.engine('html', require('ejs').renderFile);
app.engine('handlebars', exphbs({defaultLayout: 'layout'}));
app.set('view engine', 'handlebars');


//style sheets
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())


//database
const MONGODB_URI = process.env.MONGODB_URL;

mongoose.connect(MONGODB_URI,{ useNewUrlParser : true, useUnifiedTopology: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('connected');
});



// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/mydb";
// var mongoOptions = {useNewUrlParser: true, useUnifiedTopology: true};

// MongoClient.connect(url,mongoOptions ,function(err, db) {
//   if (err) throw err;
//   console.log("Database created!");
//   db.close();
// });

// app.post('/successpage', function (req, res) {
//     db.then(function(d) {
//         d.collection('feedbacks').insertOne(req.body);
//     });    
//     // res.send('Data received:\n' + JSON.stringify(req.body));
//     res.render( '/welcome');
// })

// var dbm = new Schema({ typediff: String}, { collection : 'feedbacks' });
// app.get('/view-feedbacks',  function(req, res) {
//     dbm.then(function(d) {
//         d.collection('feedbacks').find({}).toArray().then(function(feedbacks) {
//             res.status(200).json(feedbacks);
//         });
//     });
// });

app.use(session({secret : 'ilearnnodejs'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Routes
require('./config/passport')(passport);
require('./routes/index')(app,passport);

//app.listen(3000);
const PORT = process.env.PORT;

app.listen(PORT,() => {
    console.log(`app is listening to port ${PORT}`);
})

// //index.html page
// app.get('/index', (req, res)=>{
//     res.sendFile(path.join(__dirname, 'index.html'));
// });
