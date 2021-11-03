let pool = require("../config/db");

class Rallyes {
  static async create(name) {
    pool.query(
      "INSERT INTO rallyes SET ?",
      { rallye_name: name },
      function (error, results, fields) {
        if (error) throw error;
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
