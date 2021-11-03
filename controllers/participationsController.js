const participations = require("../models/participationsModel");
const players = require("../models/playersModel");
const rallyes = require("../models/rallyesModel");

async function getParticipationsByRallye(req, res) {
  participations.findAll(function (participations) {
    if (participations.length === 0) {
      participations.push({
        rallye_name: "Aucune participation",
        player_name: "aucun",
        points: "aucun",
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      });
    }
    res.render("pages/participations", { participations: participations });
  }, req.params.id);
}

async function getGeneralRanking(req, res) {
  participations.getGeneralRanking(function (rankings) {
    //console.log(rankings);
    res.render("pages/generalRanking", { rankings: rankings });
  });
}

async function form(req, res) {
  players.findAll(function (players) {
    rallyes.findAll(function (rallyes) {
      res.render("pages/participationsForm", {
        players: players,
        rallyes: rallyes,
      });
    });
  });
}
async function createParticipation(req, res) {
  if (
    req.body.player === undefined ||
    req.body.player === "" ||
    req.body.milliseconds === undefined ||
    req.body.milliseconds === "" ||
    req.body.minutes === undefined ||
    req.body.minutes === "" ||
    req.body.seconds === undefined ||
    req.body.seconds === "" ||
    req.body.rallye === undefined ||
    req.body.rallye === ""
  ) {
    res.redirect(`/participations/form`);
  } else {
    const participationCreated = participations.create(
      req.body.player,
      req.body.rallye,
      req.body.minutes,
      req.body.seconds,
      req.body.milliseconds
    );
    if (participationCreated) {
      participations.generateScore(req.body.rallye);
      setTimeout(() => {
        res.redirect(`/participations/get/${req.body.rallye}`);
      }, 200);
    } else {
      res.redirect(`/participations/form`);
    }
  }
}

exports.getParticipationsByRallye = getParticipationsByRallye;
exports.createParticipation = createParticipation;
exports.getGeneralRanking = getGeneralRanking;
exports.form = form;
