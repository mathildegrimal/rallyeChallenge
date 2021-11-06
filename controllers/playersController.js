const players = require("../models/playersModel");

async function form(req, res) {
  res.render("pages/playersForm");
}

async function createPlayer(req, res) {
  if (req.body.name === undefined || req.body.name === "") {
    res.redirect("pages/playersForm");
  } else {
    await players
      .create(req.body.name)
      .then(() => console.log("joueur enregistré"));
  }
  res.redirect("/");
}

async function deletePlayer(req, res) {
  await players
    .delete(req.params.id, function () {
      res.redirect("/");
    })
}
exports.createPlayer = createPlayer;
exports.form = form;
exports.deletePlayer = deletePlayer;
