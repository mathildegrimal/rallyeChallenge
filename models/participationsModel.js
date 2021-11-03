const connexion = require("../config/db");
class Participations {
  static async generateScore(rallye) {
    connexion.query(
      "SELECT  * from participations where rallye_id = ? order by total_time desc",
      [rallye],
      (error, results) => {
        if (error) throw error;
        let points = 0;
        for (const result of results) {
          let data = [points, result.participation_id];
          connexion.query(
            "UPDATE participations SET points = ? WHERE participation_id = ?",
            data,
            (error, results) => {
              if (error) throw error;
            }
          );
          points++;
        }
      }
    );
  }

  static async create(player, rallye, minutes, seconds, milliseconds) {
    let totalTime =
      parseInt(minutes) * 60 +
      parseInt(seconds) +
      parseInt(milliseconds) / 1000;

    connexion.query(
      "INSERT INTO participations SET ?",
      {
        player_id: parseInt(player),
        rallye_id: parseInt(rallye),
        minutes: parseInt(minutes),
        seconds: parseInt(seconds),
        milliseconds: parseInt(milliseconds),
        total_time: totalTime,
        points: 0,
      },
      function (error, results, fields) {
        if (error) throw error;
        //console.log(results);
      }
    );
  }
  static async findAll(cb, id) {
    connexion.query(
      "SELECT player_name, rallye_name, points, minutes, seconds, milliseconds FROM participations " +
        "inner join players on players.player_id = participations.player_id " +
        "inner join rallyes on rallyes.rallye_id = participations.rallye_id " +
        "where participations.rallye_id = ? order by points DESC",
      [id],
      (error, results) => {
        if (error) throw error;
        cb(results);
      }
    );
  }

  static async getGeneralRanking(cb) {
    connexion.query(
      "SELECT sum(points) as points, player_name from participations " +
        "inner join players " +
        "on participations.player_id = players.player_id " +
        "group by participations.player_id order by points DESC",
      (error, results) => {
        if (error) throw error;
        cb(results);
      }
    );
  }
}

module.exports = Participations;
