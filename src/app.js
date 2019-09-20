const path = require('path')
const express = require('express')
const hbs= require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = 3000
//Define paths for Express config

const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath= path.join(__dirname,'../templates/partials')

// setup Handle bar engine
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory use
app.use(express.static(publicDirectory))


app.get('', (req, res) =>{
    res.render('index',{
        title: 'Weather App',
        name: 'Vijay'
    })
})

app.get('/about', (req, res) =>{
    res.render('about',{
        title: 'About Me',
        name: 'Vijay Prakash'
    })
})

app.get('/help', (req, res) =>{
    res.render('help',{        
        title: 'Help',        
        name: 'Vijay'        
    })
})

app.get('/weather', (req, res) => {
    searchAddress = req.query.address
    if(!searchAddress){
        return res.send({
            error: "You must provide a Address to search the weather"            
        })      
    }
    geocode(searchAddress, (error, {latitude, longitude, location} = {}) => {        
            if (error){
                return res.send({ error })                
            }         
        forecast(latitude, longitude, (error, forecastData) => {
            if (error){
            return res.send({ error  }) 
        }       
            res.send({
                address: searchAddress,        
                forecast: forecastData,
                location: location
            })               
        })           
    })   
    
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: "You must provide a search term"            
        })
        
    }
    console.log(req.query.search)
    res.send({
        product:[]
    })
})

app.get('/help/*', (req, res) => {
    res.render('404Help', {
        title: '404',
        name: 'Vijay',
        message: 'Help Article Not found'        
    })
   
})

app.get('*',(req, res) => {
    res.render('404', {
        title: '404',
        name: 'Vijay',
        message: 'Page Not found'        
    })
    
})


app.listen(port, () => {
    console.log('Server is up and running.')
})