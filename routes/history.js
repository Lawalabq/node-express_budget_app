const express = require("express");
const hisoryRouter = express.Router();
const balance_history = require("../appData").balance_history;
function update_by_id() {}

hisoryRouter.get("/:username", (req, res) => {
  res.render("history", {
    name: req.params.username,
    account: balance_history[req.params.username],
  });
});

hisoryRouter
  .get("/:username/:id", (req, res) => {
    if (req.query._method === "DELETE") {
      console.log("here");
      ans = balance_history[req.params.username].delete_by_id(req.params.id);
      console.log(req.params.id);
      res.redirect("/history/" + `${req.params.username}`);
    } else {
      res.render("edit", {
        transaction: balance_history[req.params.username].get_by_id(
          req.params.id
        ),
        id: req.params.id,
      });
    }
  })
  .post("/:username/:id", (req, res) => {
    balance_history[req.params.username].update_by_id(
      req.params.id,
      req.body.amount,
      req.body.type,
      req.body.date
    );
    res.redirect("/history/" + `${req.params.username}`);
  });

module.exports = hisoryRouter;
