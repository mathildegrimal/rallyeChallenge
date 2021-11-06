const participationsModel = require("../models/participationsModel");
const players = require("../models/playersModel");
const rallyes = require("../models/rallyesModel");

async function deleteParticipation(req, res) {
  participationsModel.delete(
    req.params.id,
    req.params.rallyeId,
    function (rallyeId) {
      participationsModel.findAll(function (participations) {
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
      }, rallyeId);
    }
  );
}

async function getParticipationsByRallye(req, res) {
  participationsModel.findAll(function (participations) {
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
  participationsModel.getGeneralRanking(function (rankings) {
    res.render("pages/generalRanking", { rankings: rankings });
  });
}

async function form(req, res) {
  console.log(req.params.rallye);
  players.findAll(function (players) {
    rallyes.findAll(function (rallyes) {
      let data = {
        players: players,
        rallyes: rallyes,
        rallyeSelected: null,
      };
      if (req.params.rallye) {
        data.rallyeSelected = req.params.rallye
      }
      res.render("pages/participationsForm", data);
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
    participationsModel.create(
      req.body.player,
      req.body.rallye,
      req.body.minutes,
      req.body.seconds,
      req.body.milliseconds
    );
    
    setTimeout(() => {
      participationsModel.generateScore(req.body.rallye);
      setTimeout(() => {
        res.redirect(`/participations/get/${req.body.rallye}`);
      },200)
      }, 200);
    } 
  }


exports.getParticipationsByRallye = getParticipationsByRallye;
exports.deleteParticipation = deleteParticipation;
exports.createParticipation = createParticipation;
exports.getGeneralRanking = getGeneralRanking;
exports.form = form;
