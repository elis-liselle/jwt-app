const { Router } = require("express");
const mainController = require("../controllers/mainController");
const router = Router();

router.post("/register", mainController.postRegister);

module.exports = router;
