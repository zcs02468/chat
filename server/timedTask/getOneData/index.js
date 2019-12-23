const cheerio = require("cheerio");
const request = require("request");
const Quote = require('../../db').Quote

const url = 'http://m.wufazhuce.com'


const getSiteData = function () {
    request(url,function (err, res, body) {
        if( !err && res.statusCode == 200 ) {
            siteQuery(body)
        }else {
            console.log('err:'+err);
        }
    })
}

const siteQuery = async function (body) {
    $ = cheerio.load(body);
    let content = $('#quote').text()
    new Quote({ content }).save()
}
const getOneData = () => {
    schedule.scheduleJob('01 0 0 * * *', ()=> {
        getSiteData()
    })
}

module.exports = getOneData