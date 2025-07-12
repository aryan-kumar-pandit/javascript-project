const fromAmountElement = document.querySelector('.amount');
const convertedAmountElement = document.querySelector('.convertedAmount');
const fromCurrencyElement = document.querySelector('.fromCurrency');
const toCurrencyElement = document.querySelector('.toCurrency');
const resultElement = document.querySelector('.result');
const converterContainer = document.querySelector('.converter-container');

//https://www.exchangerate-api.com/

//Array to populate the select tag in these countries
const countries =[{code : "USD", name : "United State Dollar"},
    {code : "INR", name : "Indian Rupee"},
    {code : "EUR", name : "Euro"},
    {code : "BSD", name : "Bahamian Dollar"},
    {code : "BDT", name : "Taka"},
    {code : "AUD", name : "Australian Dollar"},
    {code : "BND", name : "Brunei Dollar"},
    {code : "CLP", name : "Chilean Peso"},
    {code : "CNY", name : "Yuan Renminbi"},
    {code : "XAF", name : "CFA Franc BEAC"},
    {code : "CUP", name : "Cuban Peso"},
    {code : "EGP", name : "Egyptian Pound"},
    {code : "FJD", name : "Fiji Dollar"},
    {code : "GMD", name : "Dalasi"},
    {code : "DKK", name : "Danish Krone"},
    {code : "GNF", name : "Guinea Franc"},
    {code : "GYD", name : "Guyana Dollar"},
    {code : "ISK", name : "Iceland Krona"}
];

// showing countries from array to select tag
countries.forEach(country=>{
    const option1 = document.createElement('option');
    const option2 = document.createElement('option');
    option1.value = option2.value = country.code;
    option1.textContent = option2.textContent = `${country.code} (${country.name})`;

    fromCurrencyElement.appendChild(option1);
    toCurrencyElement.appendChild(option2);

    //setting default value for select tag
    fromCurrencyElement.value = "USD";
    toCurrencyElement.value = "INR";
});

//function to get exchange rate using Api
const getExchangeRate = async()=>{
    const amount = parseFloat(fromAmountElement.value);
    const fromCurrency = fromCurrencyElement.value;
    const toCurrency = toCurrencyElement.value;

    resultElement.textContent ="Fetching Exchange Rate ..."

    try {
  
    //fetch data from Api
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
    const data = await response.json();
    const conversionRate = data.rates[toCurrency];
    const convertedAmount = (amount * conversionRate).toFixed(2);

    if(typeof conversionRate === 'undefined'){
        converterContainer.innerHTML = `<h1>Conversion rate not found</h1>`;
        convertedAmountElement = '';
    }else{
        convertedAmountElement.value = convertedAmount;
        resultElement.textContent = `${amount} ${fromCurrency} = ${convertedAmount}`;
    }   
    } catch (error) {
        converterContainer.innerHTML = `<h1>Result not found</h1>`;
    }
};

//fetching exchange rate when there is user input amount
fromAmountElement.addEventListener('input',getExchangeRate);
//fetching exchange rate when there is user change currency
fromCurrencyElement.addEventListener('change',getExchangeRate);
toCurrencyElement.addEventListener('change',getExchangeRate);
window.addEventListener('load',getExchangeRate);