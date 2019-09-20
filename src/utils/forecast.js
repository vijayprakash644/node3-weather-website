const request=require('request')

const forecast = ( latitude, longitude, callback ) => {
     const url = 'https://api.darksky.net/forecast/1d9fc94abd74392d6d22d8c861057fda/' + latitude +','+ longitude +'?units=si&lang=en'
     request({ url, json : true }, (error, {body}) =>{
        if (error){
            callback('', undefined)
        } else if (body.error){
            callback('', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + " It is currently "+body.currently.temperature +" degress out. There is "+body.currently.precipProbability+ "% chances of rain.")
        }    
   
   })
} 

module.exports = forecast
