const { IssuerRepository, BookRepository } = require("../repository/index");
class BookService {
    constructor() {
        this.issuerRepo = new IssuerRepository();
        this.bookRepo = new BookRepository();
    }
    async extract(payload){
        if(payload.nhaxuatban){
            payload.nhaxuatban = await this.issuerRepo.selectById(payload.nhaxuatban);
        }
        return payload;
    } 
    async create(payload) {
        payload = await this.extract(payload);
        const result = await this.bookRepo.create(payload);
        return result;
    }

    async find(filter) {
        const cursor = await  this.bookRepo.selectOne(filter);
        return cursor;
    }
    async findAll() {
        const cursor = await this.bookRepo.selectAll();
        return cursor;
    }
    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(name), $options: "i" },
        });
    }

    async findById(id) {
        return await this.bookRepo.selectById(id);
    }

    async update(id, payload) {
        payload = await this.extract(payload);
        let book = await this.findById(id);
        const result = await this.bookRepo.updateOne(book._id, payload);
        return result;
    }

    async updateQuantity(id) {
        let book = await this.findById(id);
        // Trừ số lượng sách đi quantityChange
        book.soquyen = book.soquyen - 1;
        const result = await this.bookRepo.updateOne(book._id, { soquyen: book.soquyen });
        return result;
    }

    async delete(id) {
        try {
            let book = await this.findById(id);
            return await bookRepo.updateOne({ _id: book._id },{
                deleteAt: new Date()
            });
        } catch (err) {
            console.log(err);
        }
    }

    async deleteAll() {
        const result = await this.bookRepo.deleteMany({});
        return result.deletedCount;
    }
}

module.exports = BookService;
