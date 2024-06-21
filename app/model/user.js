const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const { async } = require("rxjs");
const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema(
    {
        // trim: chuỗi kh được có khoảng cách ở đầu cuối, required bắt buộc
        hoten: { type: String, trim: true, required: true },
        ngaysinh: { type: Date, trim: true, required: true },
        sodienthoai: { type: String, trim: true, required: true },
        password: { type: String, trim: true, required: true },
        diachi: { type: String, trim: true, required: true },
        gioitinh: { type: String, trim: true, required: true },
        deleteAt: {type:Date},
    },
    { versionKey: false }
);

UserSchema.pre('save', function (next) {
    var user = this;
    if (!user.isModified('password')) return next();
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});


UserSchema.pre('create', function (next) {
    var user = this;
    if (!user.isModified('password')) return next();
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

//so sánh password truyền vào vs password vs database
UserSchema.methods.comparePassword = async function (candidatePassword) {
    let isMatch = await bcrypt.compareSync(candidatePassword, this.password)
    return isMatch;
};
// thư viện tự động lấy dữ liệu liên quan 
UserSchema.plugin(require("mongoose-autopopulate"));
const User = mongoose.model("users", UserSchema);

module.exports = { User };