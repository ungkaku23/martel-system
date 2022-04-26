// const express = require("express");
// const path = require('path');

// const PORT = process.env.PORT || 3001;

// const app = express();


// // Have Node serve the files for our built React app
// app.use(express.static(path.resolve(__dirname, '../client/build')));

// // Handle GET requests to /api route
// app.get("/api", (req, res) => {
//   res.json({ message: "Hello from server!" });
// });

// // All other GET requests not handled before will return our React app
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
// });



//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname, '/client/build'));

app.get('/*', function(req,res) {

res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);