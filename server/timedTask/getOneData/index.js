const cheerio = require("cheerio");
const request = require("request");
const schedule = require('node-schedule');
const Quote = require('../../db').Quote;

const url = 'http://wufazhuce.com'


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
    // let content = $('#quote').text()
    // let quoteImgUrl = $('tbody').find('.div-link ui-link').attr('src');
    let selectItem = $("#carousel-one .carousel-inner .item");
    let todayOne = selectItem[0];
    let quoteImgUrl = $(todayOne).find(".fp-one-imagen").attr("src");
    let type=$(todayOne).find(".fp-one-imagen-footer").text().replace(/(^\s*)|(\s*$)/g, "");
    let content= $(todayOne).find(".fp-one-cita").text().replace(/(^\s*)|(\s*$)/g, "");
    new Quote({ content, quoteImgUrl, type }).save()
    
}
const getOneData = () => {
    schedule.scheduleJob('01 0 0 * * *', ()=> {
        getSiteData()
    })
}
getOneData()
// module.exports = getOneData