// root directory


//connect mongoose
const mongoose = require('mongoose');

// 1. Creates a new express server
const express = require("express"); // our webapplication framework
// write handlers to deal with different requests and serve "view"
const app = express();

// import key
const db = require('./config/keys').mongoURI;

//connect mongoose
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => console.log(err));


//2. set up a basic route to render info on our page
app.get("/", (req, res) => res.send("Hello World!!!!!"));

//3. tell our app which port 
const port = process.env.PORT || 5000;

// 4. start a socket and listen for connections on the path
app.listen(port, () => console.log(`server is running on port ${port}`));
