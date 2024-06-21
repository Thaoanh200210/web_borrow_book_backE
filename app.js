const express = require("express");
const cors = require("cors");
const booksRouter = require("./app/routes/book.route");
const managersRouter = require("./app/routes/manager.router");
const issuersRouter = require("./app/routes/issuer.route");
const usersRouter = require("./app/routes/user.route");
const borrowBooksRouter = require("./app/routes/borrow_book.route");
const ApiError = require("./app/api-error");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/books", booksRouter);
app.use("/api/managers", managersRouter);
app.use("/api/issuers", issuersRouter);
app.use("/api/users", usersRouter);
app.use("/api/borrow-books", borrowBooksRouter);

app.use((req, res, next) => {
        return next(new ApiError(404, "Resource not found"));
});
// define error-handling middleware last, after other app.use() and routes calls
app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});


module.exports = app;