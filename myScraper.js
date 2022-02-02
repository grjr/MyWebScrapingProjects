var Nightmare = require('nightmare');      
var nightmare = Nightmare({
     show: true,//Display the electron window
     waitTimeout: 1000

});

checkPrice()


async function checkPrice(){
const currPrice = await nightmare
                 .goto("https://www.amazon.ca/Apple-11-inch-iPad-Pro-Wi-Fi-128GB/dp/B0933LPPKZ")
                 .wait(".a-price-whole")                                                       //OR .wait("#corePriceDisplay_desktop_feature_div")
                 .evaluate(() => document.getElementsByClassName("a-price-whole")[0].innerText)//OR .evaluate(()=>document.getElementById("corePriceDisplay_desktop_feature_div").innerText)
                 .end()
const currPriceNumber = parseInt(currPrice)  
//const currPriceNumber = parseFloat(currPrice.replace('$',''))
if(currPriceNumber < 1000)    
    console.log("It is cheap") 
else
    console.log("It is expensive")   
    
console.log("String value: "+currPrice)
console.log("After converting to number: "+currPriceNumber)
}