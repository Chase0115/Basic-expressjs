const express = require("express");
const template = require("../lib/template.js");
const router = express.Router();
const auth = require("../lib/auth.js");

router.get("/", (req, res) => {
  const title = "Welcome";
  const description = "Hello, Node.js";
  const list = template.list(req.list);
  const html = template.HTML(
    title,
    list,
    `<h2>${title}</h2>${description}
    <img src='/images/hello.jpg' style="width: 400px; display: block; margin-top: 20px;" >
    `,
    `<a href="/topic/create">create</a>`,
    auth.loginUI(req, res)
  );
  res.send(html);
});

module.exports = router;
