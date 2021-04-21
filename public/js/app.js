console.log('output from app.js')

//remember this is javascript and not NODE!!
//fetch data from api
// //use 'then for callback funtion
// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     //when json data is returned then run function
//     response.json().then((data)=>
//     {
//         //json data
//         console.log(data.puzzle)
//     })
//     console.log(response);
// })

getLocation =(address)=>
{
fetch('http://localhost:5000/weather?address='+ address).then((res)=>
{
    
    res.json().then((data)=>
    {
        
        if(data.error)
        {
            messageTwo.textContent = data.error;
            messageOne.textContent = '';
        }
        else
        {
            foreCastIMG.src = data.icon;
            messageOne.textContent = '';
            messageTwo.innerHTML = '';
            messageOne.innerHTML = 'Place: ' + data.place + '</br>' +
            'Temp: ' + data.temperature + '</br>' +
            'Feels Like: ' + data.feelslike + '</br>' +
            'Forecast: ' + data.forecast + '</br>' +
            'Address: ' + data.address + '</br>'
            // console.log(data.place,data.feelslike)

            // {
            //     "place": "Hamilton",
            //     "temperature": 1,
            //     "feelslike": -3,
            //     "forecast": "Clear",
            //     "address": "Hamilton",
            //     "icon": "https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0008_clear_sky_night.png"
            //     }
        }
    })

});
}
//get the form tag - remember to move app.js to end of html page
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
//reference object by id
const  messageOne= document.querySelector('#message-1')
const  messageTwo= document.querySelector('#message-2')
const foreCastIMG= document.querySelector('#test')

//add event
weatherForm.addEventListener('submit',(e)=>{
    //prevent page from refreshing
    const location = search.value;
    getLocation(location);
    e.preventDefault();

    messageOne.textContent='Loading...';
    messageTwo.textContent='';
    console.log(location)
})
