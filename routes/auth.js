const express = require("express");
const router = express.Router();
const auth = require("../lib/auth.js");
const template = require("../lib/template.js");

module.exports = function (passport) {
  router.get("/login", (req, res) => {
    var title = "WEB - login";
    var list = template.list(req.list);
    var html = template.HTML(
      title,
      list,
      `
      <form action="/auth/login_process" method="post">
        <p><input type="text" name="email" placeholder="email"></p>
        <p>
        <input type="password" name="password" placeholder="password">
        </p>
        <p>
          <input type="submit" value="login">
        </p>
        </form>
            `,
      "",
      auth.loginUI(req, res)
    );
    res.send(html);
  });

  router.post(
    // 사용자가 데이터를 전송했을때 어떻게 처리할지 정의함
    "/login_process",
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/auth/login",
    })
  );
  router.get("/logout", (req, res) => {
    req.logout((err) => {
      if (err) {
        console.error(err);
      }
      res.redirect("/");
    });
  });
  return router;
};
