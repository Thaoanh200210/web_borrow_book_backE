const express = require("express");
const managers = require("../controllers/manager.controller");

const router = express.Router();

router.route("/")
    .get(managers.findAll)
    .post(managers.create)
    .delete(managers.deleteAll);

router.route("/:id")
    .get(managers.findOne)
    .put(managers.update)
    .delete(managers.delete);

router.route("/login")
    .post(managers.login)
module.exports = router;