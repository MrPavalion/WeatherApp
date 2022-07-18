const express = require("express");
const https = require("https")
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
})


app.post("/",function(req,res){
  console.log(req.body.cityName);
  const query = req.body.cityName;
  const apiKey = "8e361a3cbe87a7b79d30f68993fe7f56";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey;
  https.get(url,function(response){
    console.log(response.statusCode);

    response.on("data",function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp
      const desc = weatherData.weather[0].description;
      console.log(weatherData);
      console.log(temp);
      console.log(desc);
     res.write("<h1 >The tempurature in "+query+" is "+temp+ " degree celsius</h1>");
      res.write("<h2>The weather is currently "+desc+"</h2>");
      res.send();
    })
  })





})





app.listen(3000,function(){
  console.log("Server is running on port 3000.");
})
