const express = require('express');
const app = express();
const jsxEngine = require('jsx-view-engine') //declare variable requiring jsx-view-engine library

const fruits = require('./models/fruit.js')
const vegetables = require('./models/vegetables.js')

//adding our view templates
  app.set('view engine', 'jsx');
  app.engine('jsx', jsxEngine());

//Middleware
app.use((req, res, next) => {
    console.log('I run for all routes')
    next()
})
    //View Body of Post Request --> IMPORTANT! for post requests need a middleware function to access data
        app.use(express.urlencoded({extended: false}))  //middleware function that parses incoming requests where content-type matches. creates body object containing parsed data as key-value pairs (if extended = false --> value can be string or array and if extended = true --> value can be any data type)

//routes
    //Index Route
    app.get('/fruits/', (req, res) => {
        // res.send(fruits);
        res.render('fruits/Index', {fruits: fruits})
    });

    app.get('/vegetables/', (req, res) => {
        res.render('vegetables/Index', {vegetables: vegetables})
    })

    //New Route --> get the form to add a new fruit (**NEED TO CREATE FORM FOR USER TO INPUT NEW DATA)
    app.get('/fruits/new', (req, res) => {
        res.render('fruits/New')
    })

     app.get('/vegetables/new', (req, res) => {
        res.render('vegetables/New')
    })

    //Delete Route
    //Update Route

    //Create Route --> grabs information from form and sends to database (temporarily adding data since fruit.js is static data)
    app.post('/fruits', (req, res) => {
        console.log(req.body)   //outputs object of data
        
        if(req.body.readyToEat === 'on'){   //checkbox is boolean but instead of true/false it outputs on/off so need to 'translate'
            req.body.readyToEat = true      //data correction
        }else{
            req.body.readyToEat = false     //data correction
        }
        
        fruits.push(req.body) //adding a new temporary record to database --> not available in fruit.js but can be seen in /fruits route
        console.log(fruits)
        // res.send('data received')
        res.redirect('/fruits') //send user back to main page
    })

    app.post('/vegetables', (req, res) => {
        console.log(req.body)
        if(req.body.readyToEat === 'on'){
            req.body.readyToEat = true
        }else{
            req.body.readyToEat = false
        }
        vegetables.push(req.body)
        res.redirect('/vegetables')
    })

    //Edit Route

    //Show route - one particular fruit by ID
    app.get('/fruits/:indexOfFruitsArray', (req, res) => {
        // res.send(fruits[req.params.indexOfFruitsArray])
        res.render('fruits/Show', {
            fruit: fruits[req.params.indexOfFruitsArray]
        })     //renders the info using the appropriate template and second param must be an object
    })

    app.get('/vegetables/:indexOfVegetablesArray', (req, res) => {
        res.render('vegetables/Show', {vegetable: vegetables[req.params.indexOfVegetablesArray]})
    })

app.listen(3000, () => {
    console.log('listening');
});