const accounts = require("../appData").accounts;
const balance_history = require("../appData").balance_history;
const Account = require("../appData").Account;

function register(username, password) {
  for (let i = 0; i < accounts.length; i++) {
    if (accounts[i].username === username) {
      return Error("Username already exists");
    }
  }

  accounts.push({ username: username, password: password });
  return true;
}
function login(username, password) {
  for (let i = 0; i < accounts.length; i++) {
    if (
      accounts[i].username === username &&
      accounts[i].password === password
    ) {
      return true;
    }
  }

  return false;
}
// paths

const express = require("express");

accountRouter = express.Router();
accountRouter.get("/", (req, res, next) => {
  res.render("home", { title: "Home" });
});
accountRouter.get("/login", (req, res, next) => {
  res.render("login", { title: "Login" });
});
accountRouter.post("/login", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log("posting");
  if (login(username, password)) {
    res.redirect("/budget/" + `${String.req.body.username} `);
  } else {
    res.redirect("/account");
  }
});

accountRouter.get("/register", (req, res) => {
  res.render("register", { title: "Register" });
});
accountRouter.post("/register", (req, res, next) => {
  //   console.log(req.body);
  register(req.body.username, req.body.password);
  balance_history[req.body.username] = new Account();
  // req.session.username = req.body.username;
  res.redirect("/budget/" + `${req.body.username}`);
});

module.exports = accountRouter;
