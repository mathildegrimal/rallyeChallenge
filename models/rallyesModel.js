let pool = require("../config/db");

class Rallyes {
  static async create(name) {
    pool.query(
      "INSERT INTO rallyes SET ?",
      { rallye_name: name },
      function (error, results) {
        if (error) throw error;
        return results;
      }
    );
  }

  static async delete(id, cb) {
    pool.query(
      "DELETE FROM rallyes WHERE rallye_id = ?",
      id,
      function (error) {
        if (error) cb();
        cb();
      }
    );
  }

  static async findAll(cb) {
    pool.query("SELECT * FROM rallyes", (error, results) => {
      if (error) throw error;
      cb(results);
    });
  }
}

module.exports = Rallyes;
