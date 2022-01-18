const request = require("request") //npm install request


const alphavantagerequestUrl = 'https://www.alphavantage.co/query?';
const symbols = ['AAPL', 'MSFT', 'GOOG', 'GOOGL'];
const names_kr = ['애플', '마이크로소프트', '구글-알파벳 클래스 C', '구글-알파벳 클래스 A'];

let values = [];
/*
function getInfoData(symbols) {
    //let values = [];
    symbols.forEach( (symbol, index, array) => {
        let url = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=ZO8S591P8HTYI8LV` ;

        request(
            {
                url : url,
                method : "GET",
                json: true //이거없으면 string으로 받아와짐
            },
            (error, response, html) => {
                if (!error && response.statusCode == 200) {
                    values[index] = {
                        symbol : symbol,
                        name_kr : names_kr[index],
                        name_en : html.Name,
                        description : html.Description
                    }
                    console.log(index, html.Name);
                }
            }
        )
    })

}
*/


function oneData(symbol) {
    let url = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=ZO8S591P8HTYI8LV`
    let symboldata = {};
    request(
        {
            url : url,
            method : "GET",
            json: true //이거없으면 string으로 받아와짐
        },
        (error, response, html) => {
            if (!error && response.statusCode == 200) {
                symboldata = {
                    symbol : symbol,
                    name_kr : names_kr[0],
                    name_en : html.Name,
                    description : html.Description
                }
            }

        }
    )
    return symboldata;
}
async function main(symbol) {
	const result = await oneData(symbol); //await으로 받은거
	return result; //바로 return해주는 경우도 많음
}

symbols.forEach( (symbol, index, array) => {

    main(symbol).then( (value) => { 
        values.push(value)
        console.log(value)
    }
    );
});
//getInfoData(symbols);
//oneData("IBM");

