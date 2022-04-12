const express = require("express")
const https = require("https")
const bodyParser = require("body-parser")

const app = express()
app.use(bodyParser.urlencoded({extended: true}))
app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html")
   
})
app.post("/", function(req,res){
    const apiKey="0cdebaafabab2ae615c86996897c2589"
    const namePlace= req.body.cityName
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ namePlace +"&appid="+apiKey +""
    https.get(url, function(response){
        
        response.on("data", function(data){
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const description = "this the weather: "+ weatherData.weather[0].description
            const icon =weatherData.weather[0].icon
            const imageURL = "http://openweathermap.org/img/wn/"  + icon + "@2x.png"
            res.write("<p>the weather tempreature is : "+temp+"</P>")
            res.write( "<h1>The weather description is  "+description+" </h1> ")
            res.write("<img src=  "+imageURL+" >")
            res.send()

        })
    })
})



app.listen(3000, function(req,res){
    console.log("hi the server is workin'")
})