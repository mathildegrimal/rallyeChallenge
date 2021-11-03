let pool = require("../config/db");

class Players {
  static async create(name) {
    pool.query(
      "INSERT INTO players SET ?",
      { player_name: name },
      function (error, results, fields) {
        if (error) throw error;
        //console.log(results);
      }
    );
  }

  static async findAll(cb) {
    pool.query("SELECT * FROM players", (error, results) => {
      if (error) throw error;
      cb(results);
    });
  }
}

module.exports = Players;
