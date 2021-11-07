async function ping(req, res) {
  let rallyes = require("../models/rallyesModel");
  let players = require("../models/playersModel");
  
  rallyes.findAll(function (rallyes) {
    players.findAll(function (players) {
      res.render("pages/index", { rallyes: rallyes, players: players });
    });
  });
}

exports.ping = ping;
