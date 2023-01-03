const {sendEmail} = require("./middleware/emailService/emailService");
const {getPrice, getRsi} = require("./middleware/StockData/stockService");
const  fs = require('fs'); 
const keys = require('./config/dev.json');

const parameters = {
     symbol : "SPX",
     interval : "1min",
     outputsize : "1",
     apikey : keys['12ApiKey'],
     startDate : "",
     endDate: "",
     format: "JSON"
};
const email = "jrdbrown17@gmail.com";
const fileName = `RSIData${Date.now()}.csv`;
let overbought = false;
let undersold = false;
//var index = 0;


const excucte = () => {
    writeFile("RSI","StockPrice","DateTime");
    nIntervId = setInterval(runRSICheck, 60000)
}

const runRSICheck = async () => {
    var {datetime, rsi} = await getRsi(parameters);
    var stockPrice = await getPrice(parameters);

    if(spamGuard(rsi) && (rsi >= 70 || rsi <= 30))
    {
        writeFile(rsi,stockPrice,datetime);

        let subject =  `SPX is ${(rsi >= 70) ? "overbought":"undersold"}`;
        var messgae = `<p>RSI is ${rsi} Stock price is ${stockPrice} at ${datetime}</p>`;
        sendEmail(email, subject, messgae)
            .then((messageId) => console.log('Email sent successfully:', messageId))
            .catch((err) => console.error(err)); 
    }
    //index++; console.log(index);
}


const writeFile = async (rsi, stockPrice, datetime) => {
    fs.appendFile(fileName, `${rsi};${stockPrice};${datetime}\n`, function (err) {
        if (err) throw err;
       // console.log('Saved!');
      });
}

const spamGuard = (rsi) =>{
    let allowEmail = !overbought && !undersold;
    if(rsi >= 70)
    {
        overbought = true;
    }
    else if(rsi <= 30)
    {
        undersold = true;
    }
    else{
        overbought = false;
        undersold = false;
        allowEmail = true;
    }
    return allowEmail;
}


excucte();

// parameters.outputsize = 3000;
// parameters.format = "CSV"
// getRsi(parameters).then(d => console.log(d));
//TODO add db saves or json saves, caching so emails aren't spammed? use flag to avoid spamming