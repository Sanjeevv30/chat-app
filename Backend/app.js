const express = require("express");
const app = express();
const sequelize = require("./util/database");
const Signup = require('./models/signup');
const Message = require('./models/message');
const userGroup = require('./models/user-group');
const group = require('./models/group');
const ArchiveDb = require('./models/archive-db')
const signupRoute = require('./routes/signupRoute');
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/',signupRoute);
Message.sync();
Signup.sync();
userGroup.sync();
group.sync();
ArchiveDb.sync();
sequelize
  .sync()
  .then(() => {
    app.listen(8000, () => {
      console.log("Server running on port 8000");
    });
  })
  .catch((err) => {
    console.log("Error syncing database:", err);
  });
