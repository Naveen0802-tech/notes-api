require('dotenv').config();
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const port = process.env.PORT;
require("cors");
require("./config/database");
const userRoutes = require("./routes/user")
const notesRoutes = require("./routes/notes")

app.use(bodyparser.json());

app.use("/", userRoutes);
app.use("/notes", notesRoutes);

app.listen(port, (err) => {
  if (!err) console.log("Server connection error");
  console.log(`App running on port ${port}`)
});
