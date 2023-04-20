module.exports = function (app) {
  var authData = {
    email: "chase@chase.com",
    password: "chase",
    nickname: "chase",
  };

  var passport = require("passport");
  var LocalStrategy = require("passport-local");

  app.use(passport.initialize());
  app.use(passport.session());

  // 세션을 처리하는 방법
  passport.serializeUser(function (user, done) {
    //로그인에 성공했을때 딱 한번 session store에 저장함
    done(null, user.email); // session store 객체에 주입됨
    // done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    // 저장된 데이터를 기준으로 조회할때 사용하는 정보
    // id 는 useremail이 주입됨
    done(null, authData); // 새로고침 할때마다 나올 정보를 authData 자라에 넣으면 됨
    // User.findById(id, function (err, user) {
    //   done(err, user);
    // });
  });

  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      function verify(username, password, cb) {
        if (username === authData.email) {
          if (password === authData.password) {
            return cb(null, authData); //로그인 성공후 authData를 serializeUser에 user인자에 주입함
          } else {
            return cb(null, false, {
              message: "Incorrect username or password.",
            });
          }
        } else {
          return cb(null, false, {
            message: "Incorrect username or password.",
          });
        }
      }
    )
  );

  return passport;
};
