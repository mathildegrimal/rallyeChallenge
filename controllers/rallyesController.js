const rallyes = require("../models/rallyesModel");

async function form(req, res) {
  res.render("pages/rallyesForm");
}

async function createRallye(req, res) {
  if (req.body.name === undefined || req.body.name === "") {
    res.redirect("pages/rallyesForm");
  } else {
    await rallyes
      .create(req.body.name)
      .then(() => console.log("rallye enregistré"));
  }
  res.redirect("/");
}

async function deleteRallye(req, res) {
    await rallyes
      .delete(req.params.id, function () {
        res.redirect("/");
      })
}

exports.form = form;

exports.deleteRallye = deleteRallye;
exports.createRallye = createRallye;
