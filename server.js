const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3001;
const beersRouter = require("./routes/beers");
const apiRoutes = require("./routes/apiRoutes");
const session = require("express-session");
const passport = require("passport");
const dotenv = require("dotenv");

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
require("dotenv").config();

// Express Session
app.use(
  session({
    secret: "secret",
    saveUninitialized: true,
    resave: true,
  })
);

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/reactbeers", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});
const connection = mongoose.connection;
connection.once("open", function () {
  console.log("MongoDB database connection established successfully");
});

app.use("/beers", beersRouter);
app.use("/api", apiRoutes);

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
    app.get("*", function (req, res) {
      const index = path.join(__dirname, "client/build", "index.html");
      res.sendFile(index);
    });
} else {
  app.use(express.static(path.join(__dirname, "/client/public")));
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
  });
}


app.listen(PORT, function () {
  console.log(`Server is running on PORT: ${PORT}!`);
});
