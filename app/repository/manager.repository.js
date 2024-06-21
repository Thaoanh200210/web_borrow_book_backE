const { Manager } = require("../model/index");

class ManagerRepository {
    // Hàm xây dựng khởi tạo
    constructor() {}

    // deleteAt không có gì, nếu xóa sẽ thêm dữ liệu vào. Sau đó select chỉ cho show những cái không có gì.
    // Thực chất xóa là ẩn.
    async selectAll() {
        try {
            const query = Manager.find({
                deleteAt: {
                  $exists: false,
                  $in: [null, undefined] 
                }
              });
                // execute: thực thi
            return await query.exec();
        } catch (err) {
            console.log(err);
        }
    }

    async select(filter) {
        try {
            // lọc ra 1 list theo yêu cầu
            filter.deleteAt = {
                $exists: false,
                $in: [null, undefined] 
              }
            const query = Manager.find(filter);
            return await query.exec();
        } catch (err) {
            console.log(err);
        }
    }
    async selectOne(filter) {
        try {
            // lọc 1 thằng theo yêu cầu
            filter.deleteAt = {
                $exists: false,
                $in: [null, undefined] 
              }
            const query = Manager.findOne(filter);
            return await query.exec();
        } catch (err) {
            console.log(err);
        }
    }
    async selectById(id) {
        try {
            // lọc 1 thằng theo id 
            const query = Manager.findById(id);
            return await query.exec();
        } catch (err) {
            console.log(err);
        }
    }
    async create(data) {
        try {
            return await Manager.create(data);
        } catch (err) {
            console.log(err);
        }
    }

    async updateOne(id, data) {
        try {
            return await Manager.updateOne({ _id: id }, data);
        } catch (err) {
            console.log(err);
        }
    }

    async update(filter, data) {
        try {
            return await Manager.updateMany(filter, data);
        } catch (err) {
            console.log(err);
        }
    }
    async delete(id) {
        try {
            return await Manager.updateOne({ _id: id },{
                deleteAt: new Date()
            });
        } catch (err) {
            console.log(err);
        }
    }
    async deleteMany(filter) {
        try {
            return await Manager.updateOne(filter,{
                deleteAt: new Date()
            });
        } catch (err) {
            console.log(err);
        }
    }

    async login(manager) {
        try {
            // lọc 1 thằng theo yêu cầu
            
            let filter = {
                deleteAt : {
                    $exists: false,
                    $in: [null, undefined] 
                },
                sodienthoai: manager.sodienthoai,
            }
            const query = Manager.findOne(filter);
            let currentUser = await query.exec();
            if(currentUser){
                let isMatch = await currentUser.comparePassword(manager.password);
                return isMatch ? currentUser : null;
            }
            return null;
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = { ManagerRepository };