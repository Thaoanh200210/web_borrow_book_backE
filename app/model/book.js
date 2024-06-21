const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema(
    {
        // trim: chuỗi kh được có khoảng cách ở đầu cuối, required bắt buộc
        nhaxuatban: { 
            type: mongoose.Schema.Types.ObjectId, 
            autopopulate: true, //giúp đọc luôn dữ liệu của cả bảng chứ không chỉ lấy id
            ref: "issuers",
            required: true 
        },
        masach: { type: String, trim: true, required: true },
        tensach: { type: String, trim: true, required: true },
        dongia: { type: String, trim: true, required: true },
        soquyen: { type: Number, trim: true, required: true },
        tacgia: { type: String, trim: true, required: true },
        namxuatban: { type: Number, trim: true, required: true },
        deleteAt: {type:Date},
    },
    { versionKey: false }
);


// thư viện tự động lấy dữ liệu liên quan 
BookSchema.plugin(require("mongoose-autopopulate"));
const Book = mongoose.model("books", BookSchema);

module.exports = { Book };