//get your country code - KR
const getCountryCode = async () => {
    const response = await fetch('https://ipinfo.io/json?token=c76190236a0eea')
    if (response.status === 200) {
      const location = await response.json()
      return location.country
    } else {
      throw new Error('Unable to get your location')
    }
  }

  //get general currency code with my country code - KRW
const getCurrencyCode = async (countryCode) => {
    const response = await fetch('https://restcountries.eu/rest/v2/all')
    if (response.status === 200) {
      const data = await response.json()
      const country = data.find((country) => country.alpha2Code === countryCode)
      return country.currencies[0].code
    } else {
      throw new Error('Unable to get the currency code')
    }
  }

  //get currency rates from currencyCode - 1,122.13
const getCurrencyRate = async (currencyCode) => {
    const response = await fetch('https://open.exchangerate-api.com/v6/latest')
    if (response.status === 200) {
      const data = await response.json()
      return data.rates[currencyCode]
    } else {
      throw new Error('Unable to get the currency rate')
    }
  }

const alphavantagerequestUrl = 'https://www.alphavantage.co/query?';
const apiKey = 'ZO8S591P8HTYI8LV'
const symbols = ['AAPL', 'MSFT', 'GOOG', 'GOOGL'];
const getInfoData = async (symbols) => {
    let values = [];
    symbols.forEach( (value, index, array) => {
        let symbol = value;
        let queryParams = `function=OVERVIEW&symbol=${symbol}&apikey=${apiKey}` ;
        let url = alphavantagerequestUrl + queryParams ;

        let response = await fetch(url);
        if (response.status === 200) {
            let data = await response.json()
            return data.rates[currencyCode]
            values.push()
        } else {
            throw new Error('Unable to get the currency rate')
        }

    })
    //return 
}

  //Three functions assemble
const getCurrency = async () => {
    const countryCode = await getCountryCode()
    const currencyCode = await getCurrencyCode(countryCode)
    const currencyRate = await getCurrencyRate(currencyCode)
    return currencyRate
  }


/////
//to get my country's currency code
getCountryCode().then((data) => {
    return getCurrencyCode(data)
  }).then((data) => {
    console.log(data)
  }).catch((err) => {
    console.log(err)
  })
  // KRW
  
  //to get my country's currency
  getCurrency().then((data) => {
    console.log(data)
  }).catch((err) => {
    console.log(err)
  })
  //1122.13