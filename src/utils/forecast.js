const request = require('postman-request')
const forecast=(latitude,longitude,callback)=>
{
    //-37.719948958380364,
    //20175.28367701687228
    const url ='http://api.weatherstack.com/current?access_key=591a107c397f01ea888847ec32a6a916&query='+ encodeURIComponent(latitude)+ ','+ encodeURIComponent(longitude) +'&units=m';
    request(
        {
            url,
            json:true
        },(error, {body}={})=>//destructure respose object - we only use the body property
        {
            if(error)
            {
                callback('Unable to connect to the Weather service',undefined)
            }
            else if(body.error)
            {
                callback('Unable to find location.',undefined);
            }
            else
            {
                console.log(body.current.humidity)
                // weather_descriptions.forEach(e => {console.log(e)}
                callback(undefined,{temperature: body.current.temperature,
                                    feelslike: body.current.feelslike,
                                    weather_description: body.current.weather_descriptions[0],
                                    location: body.location.name,
                                    icon: body.current.weather_icons[0],
                                    localtime: body.location.localtime,
                                    humidity:body.current.humidity
                })
            }
        })
}
module.exports={getForecast:forecast}
//or you could say module.exports=forecast
