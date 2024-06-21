const express = require("express");
const borrowBooks = require("../controllers/borrow_book.controller");
// const { Middleware } = require("../middlewares/index");
// const mid = new Middleware();

const router = express.Router();

router.route("/:id")
    .get(borrowBooks.findByUserId)
    .put(borrowBooks.update)
    .delete(borrowBooks.delete);

// router.use(mid.authenticate);
router.route("/")
    .get(borrowBooks.findAll)
    .post(borrowBooks.create)
    .delete(borrowBooks.deleteAll);


module.exports = router;