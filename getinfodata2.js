//const request = require('request-promise-native'); // 모듈
//const request = require("request") //npm install request
const axios = require('axios');

const symbols = ['AAPL', 'MSFT', 'GOOG', 'GOOGL'];
const names_kr = ['애플', '마이크로소프트', '구글-알파벳 클래스 C', '구글-알파벳 클래스 A'];

let requests = symbols.map(symbol => request(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=ZO8S591P8HTYI8LV`));

Promise.all(requests)
  .then(responses => {
    // 모든 응답이 성공적으로 이행되었습니다.
    for(let response of responses) {
      console.log(`${response.url}: ${response.status}`); // 모든 url의 응답코드가 200입니다.
    }

    return responses;
  })
  // 응답 메시지가 담긴 배열을 response.json()로 매핑해, 내용을 읽습니다.
  .then(responses => Promise.all(responses.map(r => r.json())))
  // JSON 형태의 응답 메시지는 파싱 되어 배열 'users'에 저장됩니다.
  .then(users => users.forEach(user => console.log(user.symbol)));



//getInfoData(symbols);
    
//console.log(values);
