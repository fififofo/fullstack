const express = require("express");

// Not assigned to anything because it's not returning anything
require("./services/passport");

const app = express();

//Returns a function
require("./routes/authRoutes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
