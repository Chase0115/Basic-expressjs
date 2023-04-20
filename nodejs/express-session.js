const express = require("express");
const session = require("express-session");
var FileStore = require("session-file-store")(session);

const app = express();

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    store: new FileStore(),
  })
);

app.get("/", (req, res, next) => {
  if (req.session.num === undefined) {
    req.session.num = 1;
  } else {
    req.session.num += 1;
  }

  res.send(`view = ${req.session.num}`);
});

app.listen(3000, () => {
  console.log("port 3000 working");
});
