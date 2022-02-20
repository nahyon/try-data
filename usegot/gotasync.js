//GOT 모듈 사용
//for...of사용 - symbol하나씩 알파벤티지로 request보내기

//https://npm.io/package/got 참고
/*
	0. sample.js 먼저 참고해서 공부하기
	1. npm install  -> node_modules생성 (git에는 node_modules, package-lock 지우고 올림)
	3. 실행 : node gotasync.js
*/
//const got = require('got');
import got from "got"; //ESM modules imports

const symbols = ['AAPL', 'MSFT'] //, 'GOOG', 'GOOGL', 'AMZN', 'TSLA', 'FB', 'NVDA', 'TSM', 'JPM', 'V', 'JNJ', 'UNH', 'HD', 'WMT', 'BAC', 'PG', 'BABA'];


async function callAPI(symbol) {
	try {
		const response = await got(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=compact&apikey=ZO8S591P8HTYI8LV`);
		console.log(response.body);
		//=> '<!doctype html> ...'
	} catch (error) {
		console.log(error.response.body);
		//=> 'Internal server error ...'
	}
}


function delay() {
	return new Promise(resolve => setTimeout(resolve, 12050)); //12초이상 (5call/분)
}

async function delayedLog2(symbol) {
	await delay();
	await callAPI(symbol);
	//console.log(symbol);

}
async function processArray2(symbols) {
	for (const symbol of symbols) {
		await delayedLog2(symbol);
	}
	console.log('Done!');
}

processArray2(symbols);