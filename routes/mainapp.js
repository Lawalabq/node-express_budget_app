const balance_history = require("../appData").balance_history;
function GetBalance(username) {
  balance = balance_history[username].get_balance;
  return balance;
}

const express = require("express");
const mainappRouter = express.Router();

mainappRouter.get("/:username", (req, res, next) => {
  console.log(req.params);
  console.log(balance_history[req.params.username]);
  res.render("balance", {
    title: "Home",
    name: req.params.username,
    account: balance_history[req.params.username],
  });
});

mainappRouter
  .get("/:username/Deposit", (req, res, next) => {
    res.render("Deposit_Withdrawl", {
      title: "Deposit",
      account: balance_history[req.params.username],
      name: req.params.username,
    });
  })
  .post("/:username/Deposit", (req, res, next) => {
    amount = req.body.amount;
    balance_history[req.params.username].add_money(parseInt(amount));
    res.redirect("/budget/" + `${req.params.username}`);
  });
mainappRouter
  .get("/:username/Withdrawl", (req, res, next) => {
    res.render("Deposit_Withdrawl", {
      title: "WithDrawl",
      account: balance_history[req.params.username],
      name: req.params.username,
    });
  })
  .post("/:username/Withdrawl", (req, res, next) => {
    amount = req.body.amount;
    balance_history[req.params.username].use_money(parseInt(amount));
    res.redirect("/budget/" + `${req.params.username}`);
  });

module.exports = mainappRouter;
