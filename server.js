const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use("/assets", express.static("public"));
require("dotenv").config();

app.listen(PORT, () => {
  console.log("Server is running on Port: " + PORT);
});

//router github
const router = express.Router();
app.use("/", router);

const indexController = require("./controllers/indexController");
const playersController = require("./controllers/playersController");
const rallyesController = require("./controllers/rallyesController");

const participationsController = require("./controllers/participationsController");

router.route("/").get(indexController.ping);

router.route("/players/insert").post(playersController.createPlayer);
router.route("/players/form").get(playersController.form);

router
  .route("/participations/get/:id")
  .get(participationsController.getParticipationsByRallye);
router.route("/participations/form").get(participationsController.form);
router
  .route("/participations/insert")
  .post(participationsController.createParticipation);
router.route("/generalRanking").get(participationsController.getGeneralRanking);

router.route("/rallyes/insert").post(rallyesController.createRallye);
router.route("/rallyes/form").get(rallyesController.form);
