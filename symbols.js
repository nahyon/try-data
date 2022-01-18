const request = require("request")
const cheerio = require("cheerio")
const fs = require("fs")
//const cron = require("node-cron")
const { find } = require("domutils")
var List = [] //list to store symbols of company
function symbolCreator() {
  request("https://www.tradingview.com/markets/stocks-usa/market-movers-large-cap/", (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html)
      const $symbolResults = $(".tv-data-table__row.tv-data-table__stroke.tv-screener-table__result-row")
      $symbolResults.each(function (i, result) {
        List[i] = {
          id: i+1,
          title: $(this).find("div").find("div").find("a").text(),
          company: $(this)
            .find("div")
            .find("div")
            .find("span")
            .text()
            .replace(/[\n\t\r]/g, ""),
          price: $(this).find("td:nth-of-type(2)").text(),
          percent: $(this).find("td:nth-of-type(3)").text(),
        }
        //console.log(List[i].percent)
        if ( List[i].percent !== "0.00%" && List[i].percent[0] !== '-') {
            List[i].percent = "+" + List[i].percent
        }
      })
      const data = List.filter((n) => n.title)
      //   console.log(data)
      const jsonData = JSON.stringify(data)
      fs.writeFileSync("symbol.json", jsonData)
      console.log("JSON created")
      // console.log($.text())
    }
  })
}
// cron.schedule("* * * * *", symbolCreator)
symbolCreator()


