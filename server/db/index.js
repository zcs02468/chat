const {MongoDbUser, MongoDbPwd} = require('../config')
const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

mongoose.connect(`mongodb://${MongoDbUser}:${MongoDbPwd}@localhost:27017/itc`, { useNewUrlParser: true, useUnifiedTopology: true }, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Connection success!");
    }
});
const Schema = mongoose.Schema;

// 验证码
let checkcodeSchema = new Schema({
    token: String,
    code: String
});

// 用户
let userSchema = new Schema({
    user_name: String,
    user_id: String,
    user_pwd: String,
    token: {
        type: String,
        default: ""
    }
});

let recordSchema = new Schema({
    title: String,
    type: String,
    detail: String,
    create_time: {
        type: String,
        default: Date.now
    },
    img: Array,
    view: 0,
    creater: String,
    avatar: String,
    user_id: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    }
});

let quoteSchema = new Schema({
    content: String,
    quoteImgUrl: String,
    type: String,
    //创建时间./mongod  -dbpath /data/db/
    create_time: {
        type: String,
        default: Date.now
    },
})

let emailSchema = new Schema({
    from_name:String, //发送者名称
    to_email: String, //接收者邮箱地址
    subject: String, //邮件主题
    from_time: String, //邮件发送时间
    create_time:{
        type: String,
        default: Date.now
    }
})

exports.CheckCode = mongoose.model("Checkcode", checkcodeSchema);
exports.User = mongoose.model("User", userSchema);
exports.Record = mongoose.model("Record", recordSchema);
exports.Quote = mongoose.model("Quote", quoteSchema);
exports.Email = moogoose.model("Email", emailSchema);
