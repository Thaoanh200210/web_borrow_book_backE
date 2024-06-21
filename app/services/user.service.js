const { UserRepository } = require("../repository/index");
class UserService {
    constructor() {
        this.userRepo = new UserRepository();
    }
    async create(payload) {
        const result = await this.userRepo.create(payload);
        return result;
    }

    async find(filter) {
        const cursor = await this.userRepo.selectOne(filter);
        return  cursor;
    }

    async findAll(filter) {
        const cursor = await this.userRepo.selectAll(filter);
        return  cursor;
    }
    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(name), $options: "i" },
        });
    }

    async findById(id) {
        return await this.userRepo.selectById(id);
    }
    async update(id, payload) {
        let issuer = await this.findById(id);
        const result = await this.userRepo.updateOne(issuer._id, payload);
        return result;
    }

    async delete(id) {
        let issuer = await this.findById(id);
        const result = await this.userRepo.delete(issuer._id);
        return result;
    }

    async deleteAll() {
        const result = await this.userRepo.deleteMany({});
        return result.deletedCount;
    }
    async login(data) {
        return await this.userRepo.login(data);
    }
}

module.exports = UserService;
