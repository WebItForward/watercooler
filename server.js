const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const multer = require("multer");
require("dotenv").config();
require("./config/database");

const app = express();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(logger("dev"));
app.use(express.json());
app.use(favicon(path.join(__dirname, "build", "favicon.ico")));
app.use(express.static(path.join(__dirname, "build")));
app.use(require("./config/checkToken"));

const port = process.env.PORT || 3001;

app.use("/api/users", require("./routes/api/users"));

app.use("/api/profile", require("./routes/api/profile"));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port, function () {
  console.log(`Express App running on port ${port}`);
});
