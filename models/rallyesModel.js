let connexion = require("../config/db");

class Rallyes {
  static async create(name) {
    connexion.query(
      "INSERT INTO rallyes SET ?",
      { rallye_name: name },
      function (error, results, fields) {
        if (error) throw error;
        //console.log(results);
      }
    );
  }

  static async findAll(cb) {
    connexion.query("SELECT * FROM rallyes", (error, results) => {
      if (error) throw error;
      cb(results);
    });
  }
}

module.exports = Rallyes;
