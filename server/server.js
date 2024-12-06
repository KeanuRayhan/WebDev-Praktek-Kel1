const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config();

const app = express();

var corsOptions = {
  origin: ["http://localhost:3000, https://dramaku-kel1.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://dramaku-kel1.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/uploads', express.static('uploads'));

const db = require("./app/models");

db.sequelize.sync({ force: false }).then(() => {
    console.log("Synced db.");
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

require("./app/routes/movie.routes")(app);
require("./app/routes/genre.routes")(app);
require("./app/routes/plaform.routes")(app);
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/country.routes')(app);
require('./app/routes/review.routes')(app);
require('./app/routes/actor.routes')(app);
require('./app/routes/awards.routes')(app);

// set port, listen for requests
if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
}

module.exports = app;