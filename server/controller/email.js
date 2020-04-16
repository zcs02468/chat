const Email = require('../db').Email
const xss = require('xss')


module.exports = {
    async createTimingEmail(ctx, next) {
        console.log(' ctx.request.body', ctx.request.body );
        
        let { fromName= '', subject = '', toEmail= '', fromTime= '', fromFrequency= ''} = ctx.request.body
        try {
            //存储用户信息
            let email = new Email({ fromName, subject, toEmail, fromTime, fromFrequency  })
            res = await email.save()
            ctx.body = {
                code: 200,
                msg: '保存成功',
                data: ''
            }
        } catch (error) {
            console.log( 'error', error );
            
            ctx.body = {
                code: 500,
                msg: '保存失败！'
            }
        }
    },

    async getEmailList(ctx, next) {
        let { page= 1, pageSize= 10 } = ctx.request.query
        page = Number(page - 1)
        pageSize = Number(pageSize)
        // await Quote.find({}).sort('-date');
        // Email.find({}).limit(2).sort({'_id':-1}).exec();
        try {
            // let res = await Email.find({}).limit(2).sort({'creat_time':'desc'});
            let res = await Email.find({}).skip(page * pageSize).limit(pageSize).sort({createTime: -1});
            let count = await Email.count({});
            ctx.body = {
                code: 200,
                msg: '保存成功',
                data: {
                    list: res,
                    count: count
                }
            }
        } catch (error) {
            ctx.body = {
                code: 500,
                msg: '保存失败！'
            }
        }
    }
};
