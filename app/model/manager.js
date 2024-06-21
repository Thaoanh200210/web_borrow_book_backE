const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const { async } = require("rxjs");
const SALT_WORK_FACTOR = 10;
const ManagerSchema = new Schema(
    {
        // trim: chuỗi kh được có khoảng cách ở đầu cuối, required bắt buộc
        hotennv: { type: String, trim: true, required: true },
        password: { type: String, trim: true, required: true },
        sodienthoai: { type: String, trim: true, required: true },
        chucvu: { type: String, trim: true, required: true },
        diachi: { type: String, trim: true, required: true },
        deleteAt: {type:Date},
    },
    { versionKey: false }
);

ManagerSchema.pre('save', function (next) {
    var manager = this;
    if (!manager.isModified('password')) return next();
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);
        bcrypt.hash(manager.password, salt, function (err, hash) {
            if (err) return next(err);
            manager.password = hash;
            next();
        });
    });
});


ManagerSchema.pre('create', function (next) {
    var manager = this;
    if (!manager.isModified('password')) return next();
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);
        bcrypt.hash(manager.password, salt, function (err, hash) {
            if (err) return next(err);
            manager.password = hash;
            next();
        });
    });
});

//so sánh password truyền vào vs password vs database
ManagerSchema.methods.comparePassword = async function (candidatePassword) {
    let isMatch = await bcrypt.compareSync(candidatePassword, this.password)
    return isMatch;
};

// thư viện tự động lấy dữ liệu liên quan 
ManagerSchema.plugin(require("mongoose-autopopulate"));
const Manager = mongoose.model("managers", ManagerSchema);

module.exports = { Manager };