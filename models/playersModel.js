let pool = require("../config/db");

class Players {
  static async create(name) {
    pool.query(
      "INSERT INTO players SET ?",
      { player_name: name },
      function (error, results, fields) {
        if (error) throw error;
        return results;
      }
    );
  }

  static async delete(id, cb) {
    let status = 0;
    pool.query(
      "DELETE FROM players WHERE player_id = ?",
      id,
      function (error) {
        if (error) cb();
        cb()
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
