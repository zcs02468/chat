const cheerio = require("cheerio");
const fetch = require('../../utils/fetch')
const {removeAllSpaces} = require('../../utils/untils')


const urlList = {
    biquge: {
        baseUrl: function() {
            return `http://www.biquge.com.cn`
        },
        search: function ( bookName ) {
            return `http://www.biquge.com.cn/search.php?q=${ encodeURIComponent(bookName) }`
        },
        bookDetail: function (bookUrl) {
            return `http://www.biquge.com.cn${ bookUrl }`
        },
    }
}

const searchBook = async function (name) {
    try {
        let body = await fetch(urlList.biquge.search(name));
        $ = cheerio.load(body);
        let arr = [];
        $('.result-list .result-item').each(function(i, elem) {
            $elem = $(elem);
            let bookImg = $elem.find('img').attr('src')
            let name = $elem.find('.result-game-item-title-link').attr('title');
            let href = $elem.find('.result-game-item-title-link').attr('href');
            let info = $elem.find('.result-game-item-info span').text();
            let author = info.split('作者：')[1].split('类型：')[0];
            let typeDom = $elem.find('.result-game-item-info-tag')[1];
            let describe = $elem.find('.result-game-item-desc').text();
            arr.push({
                type:'biquge',
                name: name,
                bookImg: bookImg,
                bookUrl: href,
                author: author,
                type: removeAllSpaces($(typeDom).text()),
                describe: describe
            })
        });
        return arr;
    } catch (error) {
        console.log( error);
        
        return  error
    }
}

const getBookDetail = async function(url) {
    const body = await fetch(urlList.biquge.bookDetail(url));
    $ = cheerio.load(body);
    let info = $('#info p')
    let authorDom  = info[0];
    let typeDom = info[1];
    let timeDom = info[2];
    let newSectionDom = info[3];
    let name = $('h1').text();
    let author = removeAllSpaces($(authorDom).text());
    let imgUrl = $('#fmimg img').attr('src');
    let describe = $('#intro').text();
    let type = $(typeDom).text().split(',')[0];
    let lastUpdateTime = $(timeDom).text();
    let newSection = $(newSectionDom).text();
    let list = []
    $('#list dd').each(function (i, elem) {
        let aDom = $(elem).find('a')
        list.push({
            title: aDom.text(),
            bookUrl: aDom.attr('href')
        })
    })
    return {
        name: name,
        author: author,
        imgUrl: imgUrl,
        type: type,
        describe: describe,
        lastUpdateTime: lastUpdateTime,
        newSection: newSection,
        list: list
    }
    
}


const getContent = async function(url) {
    const body = await fetch(urlList.biquge.bookDetail(url));
    $ = $(body);
    let title = $('h1').text();
    let content = $('#content').text();
    return {
        title: title,
        content: content
    }
}

searchBook('圣墟')
module.exports = {
    searchBook,
    getBookDetail,
    getContent
}