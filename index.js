const {sendEmail} = require("./middleware/emailService/emailService");
const {getPrice, getRsi} = require("./middleware/StockData/stockService");
const keys = require('./config/dev.json');

const parameters = {
     symbol : "SPX",
     interval : "1min",
     outputsize : "1",
     apikey : keys['12ApiKey'],
     startDate : "",
     endDate: "",
};
const email = "jrdbrown17@gmail.com";
//var index = 0;


const excucte = () => {
    nIntervId = setInterval(runRSICheck, 6000)
}

const runRSICheck = async () => {
    var {datetime, rsi} = await getRsi(parameters);
    var stockPrice = await getPrice(parameters);

    if(rsi >= 70 || rsi <= 30)
    {
        let subject =  `SPX is ${(rsi >= 70) ? "overbought":"undersold"}`;
        var messgae = `<p>RSI is ${rsi} Stock price is ${stockPrice} at ${datetime}</p>`;
        sendEmail(email, subject, messgae)
            .then((messageId) => console.log('Email sent successfully:', messageId))
            .catch((err) => console.error(err)); 
    }
    //index++; console.log(index);
}

excucte();