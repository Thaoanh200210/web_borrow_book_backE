const express = require("express");
const books = require("../controllers/book.controller");
// const { Middleware } = require("../middlewares/index");
// const mid = new Middleware();

const router = express.Router();

// router.use(mid.authenticate);
router.route("/")
    .get(books.findAll)
    .post(books.create)
    .delete(books.deleteAll);

router.route("/:id")
    .get(books.findOne)
    .put(books.update)
    .delete(books.delete);

router.route("/update/:id")
    .put(books.updateQuantity)

module.exports = router;
