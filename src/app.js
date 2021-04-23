//process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast');
const path = require('path') //The path module provides utilities for working with file and directory paths. It can be accessed using:
const express = require('express')
//handlebars or HBS(handlebars for express) - help render dynamic html - template engine
const port = process.env.PORT || 5000
const hbs = require('hbs')
const app = express();
//configure express through app 
//to setup routes
//app.com = root
//app.com/help
//app.com/about
//console.log(__dirname)
//console.log(path.join(__dirname,'..'))//go back one folder
//console.log(path.join(__dirname,'../public'))//go back one folder

//Define paths for express config
const publicPath =  path.join(__dirname,'../public');
const viewPath = path.join(__dirname,'../templates/views')
const partialPath= path.join(__dirname,'../templates/partials')
//setup handlebars
//refer to expressjs docs on expressjs.com
app.set('view engine','hbs') //set a express variable
app.set('views',viewPath)
hbs.registerPartials(partialPath)
app.use(express.static(publicPath))

//render a hbs view
app.get('',(req,res)=>{
    res.render('index',{ //inject object to handle bar page
        title: 'Weather App',
        name:"Arlet Meyer"
    })
    
})
app.get('/about',(req,res)=>{
        res.render('about',{
            title:'About Page',
            name: 'weather application'
        })

    })
    app.get('/help',(req,res)=>{
        res.render('help',{
            title: 'Help Page',message: 'This is the help page',name:'Arlet Meyer'
        })
    })

    //404 catcher
    app.get('/help/*',(req,res)=>{
        res.render('404',{title: '404',
            message:"The help article could not be found",
            name:"Arlet Meyer"
        })
    })

    app.get('/weather',(req,res)=>{
        if(!req.query.address)
        {
            return res.send({
                error: 'you must provide a address for a search'
            });
        }

        geoCode.getLocation(req.query.address,(error,{latitude,longitude,location}={})=>
        {
            if(error)
            {
               return res.send({error});
            }
            forecast.getForecast(latitude,longitude, (error, {temperature,location,weather_description,icon,feelslike,humidity,localtime}={}) => {
                if(error)
                {
                      return res.send({error});
                }
                return res.send(
                    {
                        place:location,
                        temperature,
                        feelslike,
                        forecast:weather_description,
                        address:req.query.address,
                        icon,
                        humidity,
                        localtime
              })
             });
        });
    });

    app.get('/products',(req,res)=>{
        //req.query access the query object
        //req.query.search access the search key
        if(!req.query.search)
        {
            return res.send(
                {
                    error:'you must provide a search term'
                });
                
        }
        console.log(req.query.search)
        console.log(req.query)
        //Note: you cannot send to send response
        res.send({
            products:[]
        })
    })
    //where the page has not been defined (404)
    app.get('*',(req,res)=>{
        res.render('404',{title: '404',
            message:"The page could not be found", 
            name:"Arlet Meyer"
        })
    })
//node variables
// app.get('',(req,res)=>{

//     //send response(res)
//     res.send('<h1>Weather</h1>')

// })//root

// app.get('/help',(req,res)=>{

//     res.send([{
//         name:'test',
//         age:47,
//         type: 'test'
//     },
//     {
//         name:'test1',
//         age:47,
//         type: 'test1'
//     }])
// })

// app.get('/about',(req,res)=>{

//     res.send('<h3>About Page<h3>')
// })

//start webserver 
app.listen(port,()=>{
    console.log('Server is running on port 5000');
})