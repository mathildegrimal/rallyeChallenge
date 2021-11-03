let connexion = require("../config/db");

class Players {
  static async create(name) {
    connexion.query(
      "INSERT INTO players SET ?",
      { player_name: name },
      function (error, results, fields) {
        if (error) throw error;
        //console.log(results);
      }
    );
  }

  static async findAll(cb) {
    connexion.query("SELECT * FROM players", (error, results) => {
      if (error) throw error;
      cb(results);
    });
  }
}

module.exports = Players;
