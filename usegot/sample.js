//GOT 모듈 사용
//for...of사용 

/* sample.js
   got모듈 + for..of 로 12초마다 한번씩 실행되는 코드 예시
*/

//https://npm.io/package/got 참고
/*
  1. npm install got
  2. ./package.json 에서  "type": "module" 추가
  3. 실행 : node sample.js
*/

/*
  ------------------------------------------------------------- <- 로 끊어놓은 단위 별로 주석처리해서 실행해보면 됨
*/


//const got = require('got'); //commonjs 모듈
import got from "got"; //ESM modules imports

//got라이브러리 써보기 --------------------------------------------------------------
//Promise
(async () => {
	try {
		const response = await got(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&outputsize=compact&apikey=ZO8S591P8HTYI8LV`);
		console.log(response.body);
		//=> '<!doctype html> ...'
	} catch (error) {
		console.log(error.response.body);
		//=> 'Internal server error ...'
	}
})();
//----------------------------------------------------------------------------------



//ex1 -- for...of 사용 기본 예제 ----------------------------------------------------
function delay() {
	return new Promise(resolve => setTimeout(resolve, 2000)); //2초
}

async function delayedLog(item) {
	await delay();
	console.log(item);
}

async function processArray(array) {
	for (const item of array) {
	  await delayedLog(item);
	}
	console.log('Done!');
}

processArray([1, 2, 3]); //2초마다 하나씩 나올것임
//----------------------------------------------------------------------------------



//ex2 -- alphavantage 요청(got라이브러리) 보내는 예제 -------------------------------
//gotasync.js와 동일
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
	//console.log(symbol); //리스트의 symbol이 12초마다 한번씩 콘솔에 찍힘

}
async function processArray2(symbols) {
	for (const symbol of symbols) {
		await delayedLog2(symbol);
	}
	console.log('Done!');
}

processArray2(symbols);
//----------------------------------------------------------------------------------
