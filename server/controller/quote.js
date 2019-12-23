const Quote = require('../db').Quote

module.exports = {
    async getQuote(ctx, next) {
        try {
            // let res = await Quote.find().sort("theDate:-1").exec(function(err,doc){
            let res = await Quote.find({}).sort('-date');
            console.log( 'res', res );
            let data = res[res.length-1].content
            ctx.body = {
                code: 200,
                msg: '获取每日一句成功！',
                data: data
            }
        } catch (error) {
            console.log( 'error', error );
            
            ctx.body = {
                code: 500,
                msg: '获取每日一句失败！'
            }
        }
    }
};


