//vrckkvikbnxwbicc
const nodemailer = require('nodemailer'); //发送邮件的node插件

let transporter = nodemailer.createTransport({
    service: "qiye.aliyun", // 发送者的邮箱厂商，支持列表：https://nodemailer.com/smtp/well-known/
    port: 465, // SMTP 端口
    secureConnection: true, // SSL安全链接
    auth: {   //发送者的账户密码
      user: 'zcs@zcssite.com', //账户
      pass: 'Zxcv02468', //smtp授权码，到邮箱设置下获取
    }
  });

let mailOptions = {
    from: '"发送者昵称" <zcs@zcssite.com>', // 发送者昵称和地址
    to: '466971601@qq.com', // 接收者的邮箱地址
    subject: '每日一语', // 邮件主题
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