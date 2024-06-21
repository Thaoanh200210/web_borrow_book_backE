const { IssuerRepository } = require("../repository/index");
class IssuerService {
    constructor() {
        this.issuerRepo = new IssuerRepository();
    }
    async create(payload) {
        const result = await this.issuerRepo.create(payload);
        return result;
    }

    async find(filter) {
        const cursor = await this.issuerRepo.selectOne(filter);
        return  cursor;
    }

    async findAll(filter) {
        const cursor = await this.issuerRepo.selectAll(filter);
        return  cursor;
    }

    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(name), $options: "i" },
        });
    }

    async findById(id) {
        return await this.issuerRepo.selectById(id);
    }
    async update(id, payload) {
        let issuer = await this.findById(id);
        const result = await this.issuerRepo.updateOne(issuer._id, payload);
        return result;
    }

    async delete(id) {
        let issuer = await this.findById(id);
        const result = await this.issuerRepo.delete(issuer._id);
        return result;
    }

    async deleteAll() {
        const result = await this.issuerRepo.deleteMany({});
        return result.deletedCount;
    }
}

module.exports = IssuerService;
