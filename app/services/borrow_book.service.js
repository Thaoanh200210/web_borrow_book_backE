const { UserRepository,  BookRepository, BorrowBookRepository } = require("../repository/index");
class BookService {
    constructor() {
        this.userRepo = new UserRepository();
        this.bookRepo = new BookRepository();
        this.borrowBookRepo = new BorrowBookRepository();
    }
    async extract(payload){
        if(payload.masach){
            payload.masach = await this.bookRepo.selectById(payload.masach);
        }
        if(payload.madocgia){
            payload.madocgia = await this.userRepo.selectById(payload.madocgia);
        }
        return payload;
    }
    async create(payload) {
        payload = await this.extract(payload);
        const result = await  this.borrowBookRepo.create(payload);
        return result;
    }

    async find(filter) {
        const cursor = await  this.borrowBookRepo.select(filter);
        return cursor;
    }
    
    async findAll() {
        const cursor = await this.borrowBookRepo.selectAll();
        return cursor;
    }
    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(name), $options: "i" },
        });
    }

    async findById(id) {
        return await  this.borrowBookRepo.selectById(id);
    }
    async update(id, payload) {
        payload = await this.extract(payload);
        let issuer = await this.findById(id);
        const result = await  this.borrowBookRepo.updateOne(issuer._id, payload);
        return result;
    }

    async delete(id) {
        let issuer = await this.findById(id);
        const result = await  this.borrowBookRepo.delete(issuer._id);
        return result;
    }

    async deleteAll() {
        const result = await  this.borrowBookRepo.deleteMany({});
        return result.deletedCount;
    }
}

module.exports = BookService;
