const request =require('postman-request')
const geoCode = (address,callback)=>
{
   //use encodeURIComponent to encode the variable to html
   const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYXJsZXRtZXllciIsImEiOiJja25taTBneDgwcWhoMnJveHo2M3FlZzJuIn0.IfC34dH7sEjw9LoNIhF5MA';
   console.log(url)
   request(
      {
         url,
         json:true
      },(error,{body}={})=> //destructure respose object - we only use the body property
      {
         if(error)
         {
            callback('Unable to connect to the Location Services!: ' + error,undefined)
         }
         else if(!body.features)
         {
            callback('Unable to locate Address: ' + address,undefined)
         }
         else if(body.features.length===0)
         {
            callback('Unable to locate Address: ' + address,undefined)
         }
         else
         {
            callback(undefined,{
               latitude: body.features[0].center[1],
               longitude: body.features[0].center[0],
               location: body.features[0].place_name
            })
         }
      })
}
module.exports=
{
    getLocation:geoCode
}