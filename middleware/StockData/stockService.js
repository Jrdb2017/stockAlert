const baseUrl = "https://api.twelvedata.com/";

exports.getRsi = async (params) => {
    const {apikey, symbol,outputsize} = params;
    let url = baseUrl+"rsi?symbol="+symbol+"&interval=1min&outputsize="+outputsize+"&apikey="+apikey;

    let data;
    await fetch(url)
    .then(data=>jsonData = data.json())
    .then(jsonData=> {data = jsonData.values[0]});

    return data;
};

exports.getPrice = async (params) => {
    const {apikey, symbol} = params;
    let url = baseUrl+"price?symbol="+symbol+"&apikey="+apikey;

    let value;
    await fetch(url)
    .then(data=>jsonData = data.json())
    .then(jsonData=> {value = jsonData.price});

    return value;
};

//TODO add logging, More specialized methods? RSI for 1 min, RSI 1min points for whole day, etc