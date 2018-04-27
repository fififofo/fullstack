const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const ('./models/User');

// Not assigned to anything because it's not returning anything
require("./services/passport");

mongoose.connect(keys.mongoURI);

const app = express();

//Returns a function
require("./routes/authRoutes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
