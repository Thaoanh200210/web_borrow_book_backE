const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const IssuerSchema = new Schema(
    {
        name: { type: String, trim: true, required: true },
        address: { type: String, trim: true, required: true },
        deleteAt: {type:Date},
    },
    { versionKey: false }
);


// thư viện tự động lấy dữ liệu liên quan 
IssuerSchema.plugin(require("mongoose-autopopulate"));
const Issuer = mongoose.model("issuers", IssuerSchema);

module.exports = { Issuer };