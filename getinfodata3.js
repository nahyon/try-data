/*
  json파일 읽어서 symbol만 가져온 후 url 리스트 만들기 (getsymbols2.js)
  + multiple request (async / await)
*/
const express = require('express');
const request = require('request'); //request모듈 사용
const cheerio = require("cheerio");
const fs = require("fs");
const { url } = require('inspector');

function readjson() {
  return new Promise(function (resolve, reject) {
    let data = fs.readFileSync("./symbol.json", 'utf8');
    resolve(data);
  })
}
async function getSymbol() {
    //let data = fs.readFileSync("./symbol.json") //동기처리
    let data = await readjson();
    let jsondata = JSON.parse(data);
    let symbols = jsondata.symbols;
    //console.log(typeof(jsondata))
    //console.log(symbols[0])

    const url = new Array()
    symbols.forEach(value => {
      //console.log(value.title)  
      let symbol = value.title
      //console.log(symbol)
      url.push(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=compact&apikey=ZO8S591P8HTYI8LV`)
    })
    //console.log(url)
    return url ;
}

//getSymbol();

//추가
//const geturlList = Promise.resolve(getSymbol());
/*
function geturlList() {
    return new Promise(function (resolve, reject) {
        let data = getSymbol();
        console.log(typeof(data))
        resolve(data);
    })
}
*/
//geturlList();


/* NodeJS version */
//uses the `request` package which makes working with Node's native http methods easier

let requestAsync = function(url) {
    return new Promise((resolve, reject) => {
        var req = request(url, (err, response, body) => {
            if (err) return reject(err, response, body);
            resolve(JSON.parse(body));
        });
    });
};


/* Works as of Node 7.6 */
let getParallel = async function(urls) {
    //transform requests into Promises, await all
    try {
        var data = await Promise.all(urls.map(requestAsync));
    } catch (err) {
        console.error(err);
    }
    //console.log(data[0]); //AAPL만
    //console.log(data)
}

//getParallel();
getSymbol().then((urls) => {
    return getParallel(urls);
})