const baseUrl = "https://api.twelvedata.com/";

exports.getRsi = async (params) => {
    const {apikey, symbol, outputsize, interval, startDate, endDate, format} = params;
    let queryParamters = `${(startDate.length > 0)? `&start_date=${startDate}` :""}${(endDate.length > 0)? `&end_date=${endDate}` :""}&format=${(format.length > 0)?format:"JSON"}`;
    let url = `${baseUrl}rsi?symbol=${symbol}&interval=${interval}&outputsize=${outputsize}${queryParamters}&apikey=${apikey}`;
    console.log(url)
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

//TODO add logging, 
//TODO handle csv format