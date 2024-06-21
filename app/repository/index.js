const { IssuerRepository } = require("./issuer.repository");
const {BookRepository} = require("./book.repository");
const {ManagerRepository} = require("./manager.repository");
const {UserRepository} = require("./user.repository");
const {BorrowBookRepository} = require("./borrow_book.repository");
module.exports = {
    IssuerRepository,
    BookRepository,
    ManagerRepository,
    UserRepository,
    BorrowBookRepository,
};