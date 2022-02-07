const express = require('express')
const myScraper = express()
const port = 5000

myScraper.get('/', (req, res) => {
  res.send('Hello there, World!')
})


myScraper.listen(port, () => {
  console.log(`My Scraper app listening on port ${port}`)
})

require('dotenv').config()  //this loads all the env variables into process.env
const sgMail = require('@sendgrid/mail')   //hook up the sendgrid library we imported earlier
sgMail.setApiKey(process.env.SENDGRID_API_KEY)


var Nightmare = require('nightmare');      
var nightmare = Nightmare({
     show: true,  //Display the electron window
     waitTimeout: 1000

})

//if passing url and minPrice when running node command
// const args = process.argv.slice(2)
// const url = args[0]
// const minPrice = args[1]

checkPrice()

async function checkPrice(){
    try{
        //dvfhvdfhvdvb //add this only to deliberately throw error
        const currPrice = await nightmare
                            .goto("https://www.amazon.ca/Apple-11-inch-iPad-Pro-Wi-Fi-128GB/dp/B0933LPPKZ")
                            //.goto(url)
                            .wait(".a-price-whole")   //IF USING CLASSNAME
                            //.wait("#corePriceDisplay_desktop_feature_div") //IF USING ID USE #
                            .evaluate(() => document.getElementsByClassName("a-price-whole")[0].innerText)
                            //.evaluate(()=>document.getElementById("corePriceDisplay_desktop_feature_div").innerText)
                            .end()

    const currPriceNumber = parseInt(currPrice)  
    //const currPriceNumber = parseFloat(currPrice.replace('$','')) //IF THE ELEMENT CONTAINS $, REPLACE IT

    if(currPriceNumber < 1000){    //if not dynamically providing minPrice, hardcode a specific number, else use 'minPrice'
        await sendEmail('Price is Low', 'The price has dropped below what u have set')
        //await sendEmail('Price is Low', `The price on ${url} has dropped below ${minPrice}`) 
        console.log("It is cheap") 
    }
    //else  //not needed when sending email, we only need to be notified when the price goes below our minPrice
    //    console.log("It is expensive")   
    console.log("Original string value: "+currPrice)
    console.log("After converting to number: "+currPriceNumber)
    //console.log("Given  minPrice: "+minPrice)
    }

    catch (e){
        await sendEmail('Amazon Price Checker Error!!!', e.message)
        throw e
    }
}
    
async function sendEmail(subject, body){
    const email = {
        to: 'greetyjerry@gmail.com',
        from: 'greety89@gmail.com',
        subject:subject,
        text:body,
        html:body
    }
    return sgMail.send(email)
}
















