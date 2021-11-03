async function form(req, res) {
  res.render("pages/rallyesForm");
}

async function createRallye(req, res) {
  let rallyes = require("../models/rallyesModel");
  if (req.body.name === undefined || req.body.name === "") {
    res.redirect("pages/rallyesForm");
  } else {
    const res = await rallyes.create(req.body.name);
    if (res) {
      console.log("rallye enregistré");
    } else {
      console.log("rallye enregistré");
    }
  }
  res.redirect("/");
}

exports.form = form;
exports.createRallye = createRallye;
