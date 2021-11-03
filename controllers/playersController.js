async function form(req, res) {
  res.render("pages/playersForm");
}

async function createPlayer(req, res) {
  let players = require("../models/playersModel");
  if (req.body.name === undefined || req.body.name === "") {
    res.redirect("pages/playersForm");
  } else {
    const res = await players.create(req.body.name);
    if (res) {
      console.log("joueur enregistré");
    } else {
      console.log("joueur non enregistré");
    }
  }
  res.redirect("/");
}

exports.createPlayer = createPlayer;
exports.form = form;
