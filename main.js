const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const compression = require("compression");

const session = require("express-session");
var FileStore = require("session-file-store")(session);

const app = express();
const port = 3000;

app.use(express.static("public")); // public 폴더 안에서 static file을 찾겠다.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    store: new FileStore(),
  })
);

var passport = require("./lib/passport")(app);

const indexRotuer = require("./routes");
const topicRouter = require("./routes/topic.js");
const authRouter = require("./routes/auth.js")(passport);

app.get("*", (req, res, next) => {
  fs.readdir("./data", function (error, filelist) {
    req.list = filelist;
    next();
  });
});

app.use("/", indexRotuer);
app.use("/topic", topicRouter);
app.use("/auth", authRouter);

app.use((req, res, next) => {
  res.status(404).send("404 Not found !! Sorry can't find that!");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("505 error !! Something broke!");
});

app.listen(port, () => {
  console.log(`${port} is running`);
});
