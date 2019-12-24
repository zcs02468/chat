const schedule = require('node-schedule');
const sendMail = require('../../module/email/index')



const timeSendMail = () => {
    schedule.scheduleJob('00 30 9 * * *', ()=> {
        sendMail()
    })
}


module.exports = timeSendMail;