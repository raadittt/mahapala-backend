const userModel = require("../models/userModel");

const login = (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    userModel.query("SELECT * FROM user WHERE username = ? AND password = ?", [username, password], (err, results) => {
      if (err) {
        console.error("Database error:", err);
        res.status(500).send("Internal Server Error");
        return;
      } else if (results.length > 0) {
        // req.session.loggedin = true;
        // req.session.username = username;
        res.redirect('/dashboard');
      } else {
        res.send('Incorrect username or password');
      }
      res.end();
    });
  } else {
    res.send('Please enter username and password');
    res.end();
  }
};

const dashboard = (req, res) => {
  if (req.session.loggedin) {
    res.send('Welcome, ' + req.session.username + '!');
  } else {
    res.send('Please login to view this page');
  }
  res.end();
};

module.exports = { login, dashboard };