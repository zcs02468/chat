const cheerio = require("cheerio");
const request = require("request");


const local = "shanghai/jinshan-district";
const WeatherUrl = "https://tianqi.moji.com/weather/china/" + local;
//当地拼音,需要在下面的墨迹天气url确认
function getWeather(){
    let p = new Promise(function(resolve,reject){
        request(WeatherUrl,function (err, res, body) {
            if( !err && res.statusCode == 200 ) {
                const weatherData = getWeatherData(body)
                resolve(weatherData)
            }else {
                reject(err);
            }
        })
    })
    return p
}

const getWeatherData = function (body) {
    $ = cheerio.load(body);
    let weatherTip;
    $(".wea_tips").each(function(i, elem) {
        weatherTip = $(elem).find("em").text();
    });
    //获取天气预报
    let threeDaysData = [];
    $(".forecast .days").each(function(i, elem) {
      const SingleDay = $(elem).find("li");
      threeDaysData.push({
        Day: $(SingleDay[0])
          .text()
          .replace(/(^\s*)|(\s*$)/g, ""),
        WeatherImgUrl: $(SingleDay[1])
          .find("img")
          .attr("src"),
        WeatherText: $(SingleDay[1])
          .text()
          .replace(/(^\s*)|(\s*$)/g, ""),
        Temperature: $(SingleDay[2])
          .text()
          .replace(/(^\s*)|(\s*$)/g, ""),
        WindDirection: $(SingleDay[3])
          .find("em")
          .text()
          .replace(/(^\s*)|(\s*$)/g, ""),
        WindLevel: $(SingleDay[3])
          .find("b")
          .text()
          .replace(/(^\s*)|(\s*$)/g, ""),
        Pollution: $(SingleDay[4])
          .text()
          .replace(/(^\s*)|(\s*$)/g, ""),
        PollutionLevel: $(SingleDay[4])
          .find("strong")
          .attr("class")
      });
    });
    return {
        weatherTip: weatherTip,
        threeDaysData: threeDaysData
    }
    
}
module.exports = getWeatherData;