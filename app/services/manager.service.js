const { ManagerRepository } = require("../repository/index");
class ManagerService {
    constructor() {
        this.managerRepo = new ManagerRepository();
    }
    async create(payload) {
        const result = await this.managerRepo.create(payload);
        return result;
    }

    async find(filter) {
        const cursor = await this.managerRepo.selectOne(filter);
        return await cursor;
    }
    async findAll() {
        const cursor = await this.managerRepo.selectAll();
        return cursor;
    }
    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(name), $options: "i" },
        });
    }

    async findById(id) {
        return await this.managerRepo.selectById(id);
    }
    async update(id, payload) {
        let issuer = this.findById(id);
        const result = await this.managerRepo.updateOne(issuer._id, payload);
        return result;
    }

    async delete(id) {
        let issuer = this.findById(id);
        const result = await this.managerRepo.delete(issuer._id);
        return result;
    }

    async deleteAll() {
        const result = await this.managerRepo.deleteMany({});
        return result.deletedCount;
    }

    async login(data) {
        return await this.managerRepo.login(data);
    }
}

module.exports = ManagerService;
