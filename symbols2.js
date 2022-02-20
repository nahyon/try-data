/*
  json파일 읽어서 symbol만 가져온 후 url 리스트 만들기
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
      console.log(symbol)
      url.push(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=compact&apikey=undefined`)
    })
    console.log(url)
}

getSymbol();

