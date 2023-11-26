const express = require("express");
const app = express();
const sequelize = require("./util/database");
const Signup = require('./models/signup')
const signupRoute = require('./routes/signupRoute');
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/',signupRoute);
Signup.sync();
sequelize
  .sync()
  .then((result) => {
    app.listen(8000, () => {
      console.log("Server running on port 8000");
    });
  })
  .catch((err) => {
    console.log("Error syncing database:", err);
  });
