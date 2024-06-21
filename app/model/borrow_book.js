const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {StatusEnum} = require("./enum/trangthai");

const BorrowBookSchema = new Schema(
    {
        // trim: chuỗi kh được có khoảng cách ở đầu cuối, required bắt buộc
        madocgia: { 
            type: mongoose.Schema.Types.ObjectId, 
            autopopulate: true, //giúp đọc luôn dữ liệu của cả bảng chứ không chỉ lấy id
            ref: "users",
            required: true 
        },
        masach: { 
            type: mongoose.Schema.Types.ObjectId, 
            autopopulate: true, //giúp đọc luôn dữ liệu của cả bảng chứ không chỉ lấy id
            ref: "books",
            required: true 
        },
        ngaymuon: { type: String, trim: true, required: true },
        ngaytra: { type: String, trim: true, required: true },
        trangthai: { type: String, trim: true, default: StatusEnum.Damuon },
        deleteAt: {type:Date},
    },
    { versionKey: false }
);


// thư viện tự động lấy dữ liệu liên quan 
BorrowBookSchema.plugin(require("mongoose-autopopulate"));
const BorrowBook = mongoose.model("borrowBooks", BorrowBookSchema);

module.exports = { BorrowBook };