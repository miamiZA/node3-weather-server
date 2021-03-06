getLocation =(address)=>
{
    //will use localhost for /
fetch('/weather?address='+ address).then((res)=>
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
            'Address: ' + data.address + '</br>' +
            'Humidity: ' + data.humidity + '</br>' +
            'Time: ' + data.localtime + '</br>'
            
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
})
