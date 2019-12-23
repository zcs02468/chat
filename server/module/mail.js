//vrckkvikbnxwbicc
const nodemailer = require('nodemailer'); //发送邮件的node插件

//发送者邮箱厂家
const EmailService = 'qiye.aliyun'
//发送者邮箱账户SMTP授权码
const EmailAuth = {
  user: 'zcs@zcssite.com',
  pass: 'Zxcv02468'
}
//发送者昵称与邮箱地址
const EmailFrom = '"发送者昵称" <zcs@zcssite.com>'

//接收者邮箱
const EmailTo = '466971601@qq.com';

const EmailSubject = '每日一报';

let transporter = nodemailer.createTransport({
    service: EmailService, // 发送者的邮箱厂商，支持列表：https://nodemailer.com/smtp/well-known/
    port: 465, // SMTP 端口
    secureConnection: true, // SSL安全链接
    auth: EmailAuth
  });

let mailOptions = {
    from: EmailFrom, // 发送者昵称和地址
    to: EmailTo, // 接收者的邮箱地址
    subject: EmailSubject, // 邮件主题
    text: 'test mail',  //邮件的text
    // html: html  //也可以用html发送  
  };
  

const sendMail = async function () {
  //发送邮件
  transporter.sendMail(mailOptions, (error, info) => {  
      if (error) {
      return console.log(error);
      }
      console.log('邮件发送成功 ID：', info.messageId);
  });  
}

module.exports = sendMail