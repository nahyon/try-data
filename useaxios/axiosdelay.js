
const axios = require("axios");

const symbols = ['AAPL', 'MSFT'] //, 'GOOG', 'GOOGL', 'AMZN', 'TSLA', 'FB', 'NVDA', 'TSM', 'JPM', 'V', 'JNJ', 'UNH', 'HD', 'WMT', 'BAC', 'PG', 'BABA'];


async function callAPI(symbol) {
	try {
        const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=compact&apikey=ZO8S591P8HTYI8LV` ;
		const response = await axios.get(url);
        
        //console.log(response.data);
        console.log(typeof(response.data));

	} catch (error) {
		console.log(error);
	
	}
}


function delay() {
	return new Promise(resolve => setTimeout(resolve, 1000)); //12050 12초이상 (5call/분)
}

async function delayedLog(symbol) {
	await delay();
	await callAPI(symbol);
	//console.log(symbol);

}
async function processArray(symbols) {
	for (const symbol of symbols) {
		await delayedLog(symbol);
	}
	console.log('Done!');
}

processArray(symbols);