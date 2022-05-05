const express = require("express")
      app = express(),
      session = require('express-session'),
      authRoute = require("./routes/auth"),
      rentalRoute = require("./routes/rental"),
      auth = require('./middleware/auth.js')(),
      mongoose = require("mongoose"),
      passport = require("passport"),
      localStrategy = require("passport-local"),
      User = require("./models/user"),
      bodyParser = require("body-parser"),
      path = require('path'),
      cors = require('cors'),
      url = "mongodb+srv://jhmun23216:a-wufshjdsus-a@cluster0.hs0c3.mongodb.net/martel?retryWrites=true&w=majority";

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then( () => {
  console.log('Connected to database ');
})
.catch( (err) => {
  console.error(`Error connecting to the database. \n${err}`);
});

app.use(cors({
  origin: '*',
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'bla bla bla' 
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(auth.initialize());
// Passport Config
passport.use(new localStrategy(User.authenticate()));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(authRoute);
app.use(rentalRoute);

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, './client/build')));

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);