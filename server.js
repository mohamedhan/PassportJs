const express = require("express");
const cors = require("cors");
const app = express();
const connectDB = require("./config/connectDB");
const passport=require('passport')
//middleware
app.use(express.json());
app.use(cors());
app.use(passport.initialize())

//import passport middleware
require('./middlewares/passport')(passport)

//connectDB
connectDB();

//Routees
app.use("/api/users",require('./routes/user'))
//listen server
const port = process.env.PORT || 5000;
app.listen(port, (err) =>
  err ? console.log(err) : console.log(`connected on port ${port}`)
);
