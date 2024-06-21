const express = require("express");
const users = require("../controllers/user.controller");
const { Middleware } = require("../middlewares/index");
const mid = new Middleware();

const router = express.Router();

router.route("/login")
    .post(users.login)

router.route("/")
    .post(users.create)
    .get(users.findAll)
router.use(mid.authenticate);

router.route("/logout")
    .post(users.logout);

router.route("/")
    
    
    .delete(users.deleteAll);

router.route("/:id")
    .get(users.findOne)
    .put(users.update)
    .delete(users.delete);


module.exports = router;