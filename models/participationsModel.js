const pool = require("../config/db");
class Participations {
  static async generateScore(rallye) {
    pool.query(
      "SELECT  * from participations where rallye_id = ? order by total_time asc",
      [rallye],
      (error, results) => {
        if (error) throw error;
        let i = 0;

        const scoring = [25, 20, 16, 10, 8, 6, 4, 2];
        for (const result of results) {
          let score = 0;
          if (i <= 7) {
            score = scoring[i];
          } else {
            score = 0;
          }
          let data = [score, result.participation_id];
          pool.query(
            "UPDATE participations SET points = ? WHERE participation_id = ?",
            data,
            (error, results) => {
              if (error) throw error;
            }
          );
          i++;
        }
      }
    );
  }

  static async delete(id, rallyeId, cb) {
    pool.query(
      "DELETE FROM participations WHERE participation_id = ?",
      id,
      function (error) {
        if (error) throw error;
        cb(rallyeId);
      }
    );
  }

  static async create(player, rallye, minutes, seconds, milliseconds) {
    let totalTime =
      parseInt(minutes) * 60 +
      parseInt(seconds) +
      parseInt(milliseconds) / 1000;

    pool.query(
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
        return results;
      }
    );
  }
  static async findAllByRallye(cb, id) {
    pool.query(
      "SELECT participation_id, player_name, rallye_name, rallyes.rallye_id as rallyeId, points, minutes, seconds, milliseconds, total_time FROM participations " +
        "inner join players on players.player_id = participations.player_id " +
        "inner join rallyes on rallyes.rallye_id = participations.rallye_id " +
        "where participations.rallye_id = ? order by total_time asc",
      [id],
      (error, results) => {
        if (error) throw error;
        cb(results);
      }
    );
  }

  static async findAll(cb) {
    pool.query(
      "SELECT * FROM participations",
      (error, results) => {
        if (error) throw error;
        cb(results);
      }
    );
  }

  static async getGeneralRanking(cb) {
    pool.query(
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
