const request=require('request')

const forecast = ( latitude, longitude, callback ) => {
     const url = 'https://api.darksky.net/forecast/1d9fc94abd74392d6d22d8c861057fda/' + latitude +','+ longitude +'?units=si&lang=en'
     request({ url, json : true }, (error, {body}) =>{
        if (error){
            callback('', undefined)
        } else if (body.error){
            callback('', undefined)
        } else {
            forcastMessage= body.daily.data[0].summary +" It is currently "+body.currently.temperature +" degress out. There is "+body.currently.precipProbability+ "% chances of rain.\n"
            forcastMessage+= " Today's High Temprature: "+ body.daily.data[0].temperatureHigh
            forcastMessage+= " Today's Low Temprature: "+ body.daily.data[0].temperatureLow
            callback(undefined,  forcastMessage )
        }    
   
   })
} 

module.exports = forecast
