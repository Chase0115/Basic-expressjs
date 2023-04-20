module.exports = {
  loginUI: (req, res) => {
    let loginUI = `<a href="/auth/login">login</a>`;
    if (req.user) {
      loginUI = `Hi, ${req.user.nickname} | <a href="/auth/logout">logout</a>`;
    } 
    return loginUI;
  },
};
