const express = require('express');
const app = express();
const jsxEngine = require('jsx-view-engine') //declare variable requiring jsx-view-engine library

// const fruits = require('./models/fruit.js')
// const vegetables = require('./models/vegetables.js')

const dotenv = require('dotenv')    //Import dotenv module to connect to your env file
const mongoose = require('mongoose')
const Fruits = require('./models/fruit.js')    //Import Fruits Model
const Vegetables = require('./models/vegetables.js')    //Import Vegetables Model

//Include method-override package --> used for overriding post method so we can delete records (method = delete) or edit records (method = put)
const methodOverride = require('method-override')

//adding our view templates
  app.set('view engine', 'jsx');
  app.engine('jsx', jsxEngine());

//To get access to process.env object with values created in .env file
    dotenv.config()
    // console.log(process.env)

mongoose.connect(process.env.MONGO_URI, {
    useNewURLParser: true,
    useUnifiedTopology: true,
})

mongoose.connection.once('open', () => {
    console.log('Connected to mongoose')
})


//Middleware
app.use((req, res, next) => {
    console.log('I run for all routes')
    next()
})
    //View Body of Post Request --> IMPORTANT! for post requests need a middleware function to access data
        app.use(express.urlencoded({extended: false}))  //middleware function that parses incoming requests where content-type matches. creates body object containing parsed data as key-value pairs (if extended = false --> value can be string or array and if extended = true --> value can be any data type)
app.use(methodOverride('_method'))
app.use(express.static('public'))   //tells express to try to match requests with files in the directory called 'public'

//Seed Route --> for testing (place above INDUCES)
// app.get('/fruits/seed', async(req, res)=>{
//     try{
//         await Fruits.create([
//             {
//                 name:'grapefruit',
//                 color:'pink',
//                 readyToEat:true
//             },
//             {
//                 name:'grape',
//                 color:'purple',
//                 readyToEat:false
//             },
//             {
//                 name:'avocado',
//                 color:'green',
//                 readyToEat:true
//             }
//         ])
//         res.redirect('/fruits')
//     }catch(error){
//         console.error(error)
//     }
// })

//Routes: INDUCES (commented out routes were before we connected to mongoDB)
    //Index Route
        // app.get('/fruits/', (req, res) => {
        //     // res.send(fruits);
        //     res.render('fruits/Index', {fruits: fruits})
        // });

        app.get('/fruits/', async(req, res) => {
            try{
                const fruits = await Fruits.find()
                res.render('fruits/Index', {
                    fruits: fruits
                })
            }catch(error) {
                console.error(error)
            }
        });

        // app.get('/vegetables/', (req, res) => {
        //     res.render('vegetables/Index', {vegetables: vegetables})
        // })

        app.get('/vegetables/', async(req, res) => {
            try{
                const vegetables = await Vegetables.find()
                res.render('vegetables/Index', {
                    vegetables: vegetables
                })
            }catch(error) {
                console.error(error)
            }
        });

    //New Route --> get the form to add a new fruit (**NEED TO CREATE FORM FOR USER TO INPUT NEW DATA)
        app.get('/fruits/new', (req, res) => {
            res.render('fruits/New')
        })

        app.get('/vegetables/new', (req, res) => {
            res.render('vegetables/New')
        })

    //Delete Route
        app.delete('/fruits/:fruitID', async(req, res) => {
            console.log('deleting..')
            try{
                await Fruits.findByIdAndRemove(req.params.fruitID)
                res.redirect('/fruits')
            }catch(error){
                console.log(error)
            }
        })

        app.delete('/vegetables/:id', async(req, res) => {
            console.log('deleting..')
            try{
                await Vegetables.findByIdAndRemove(req.params.id)
                res.redirect('/vegetables')
            }catch(error){
                console.log(error)
            }
        })
        
    //Update Route
        app.put('/fruits/:id', async(req, res) => {
            try{
                if(req.body.readyToEat === 'on'){
                    req.body.readyToEat = true     
                }else{
                    req.body.readyToEat = false
                }
            }catch(error){
                console.error(error)
            }
            await Fruits.findByIdAndUpdate(req.params.id, req.body) //need two arguments: 1 to find document to update and 2 what to update the document with

            res.redirect(`/fruits/${req.params.id}`)
        })

        app.put('/vegetables/:id', async(req, res) => {
            try{
                if(req.body.readyToEat === 'on'){
                    req.body.readyToEat = true     
                }else{
                    req.body.readyToEat = false
                }
            }catch(error){
                console.error(error)
            }
            await Vegetables.findByIdAndUpdate(req.params.id, req.body) //need two arguments: 1 to find document to update and 2 what to update the document with

            res.redirect(`/vegetables/${req.params.id}`)
        })

    //Create Route --> grabs information from form and sends to database (temporarily adding data since fruit.js is static data)
        // app.post('/fruits', (req, res) => {
        //     console.log(req.body)   //outputs object of data
        //     if(req.body.readyToEat === 'on'){   //checkbox is boolean but instead of true/false it outputs on/off so need to 'translate'
        //         req.body.readyToEat = true      //data correction
        //     }else{
        //         req.body.readyToEat = false     //data correction
        //     }
        //     fruits.push(req.body) //adding a new temporary record to database --> not available in fruit.js but can be seen in /fruits route
        //     console.log(fruits)
        //     // res.send('data received')
        //     res.redirect('/fruits') //send user back to main page
        // })

        app.post('/fruits', async (req, res) => {
            try{
                if(req.body.readyToEat === 'on'){   //if checked, req.body.readyToEat is set to 'on'
                    req.body.readyToEat = true     
                }else{
                    //if not checked, req.body.readyToEat is undefined
                    req.body.readyToEat = false
                }
                //fruits.push(req.body)
                await Fruits.create(req.body)

                res.redirect('/fruits')
            }catch(error){
                console.log(error)
            }
        })

        // app.post('/vegetables', (req, res) => {
        //     console.log(req.body)
        //     if(req.body.readyToEat === 'on'){
        //         req.body.readyToEat = true
        //     }else{
        //         req.body.readyToEat = false
        //     }
        //     vegetables.push(req.body)
        //     res.redirect('/vegetables')
        // })

        app.post('/vegetables', async (req, res) => {
            try{
                if(req.body.readyToEat === 'on'){   //if checked, req.body.readyToEat is set to 'on'
                    req.body.readyToEat = true     
                }else{
                    //if not checked, req.body.readyToEat is undefined
                    req.body.readyToEat = false
                }
                //fruits.push(req.body)
                await Vegetables.create(req.body)

                res.redirect('/vegetables')
            }catch(error){
                console.log(error)
            }
        })

    //Edit Route
        app.get('/fruits/:id/edit', async(req, res) => {
            try{
                const foundFruit = await Fruits.findById(req.params.id)
                res.render('fruits/Edit', {fruit: foundFruit})
            }catch(error){
                console.error(error)
            }
        })

        app.get('/vegetables/:id/edit', async(req, res) => {
            try{
                const foundVegetable = await Vegetables.findById(req.params.id)
                res.render('vegetables/Edit', {vegetable: foundVegetable})
            }catch(error){
                console.error(error)
            }
        })

    //Show route - one particular fruit by ID
        // app.get('/fruits/:indexOfFruitsArray', (req, res) => {
        //     // res.send(fruits[req.params.indexOfFruitsArray])
        //     res.render('fruits/Show', {
        //         fruit: fruits[req.params.indexOfFruitsArray]
        //     })     //renders the info using the appropriate template and second param must be an object
        // })

        app.get('/fruits/:fruitID', async (req, res) => {
            try{
                const fruit = await Fruits.findById(req.params.fruitID)
                res.render('fruits/Show', {fruit})
            }catch(error){
                console.log(error)
            }
        })   

        // app.get('/vegetables/:indexOfVegetablesArray', (req, res) => {
        //     res.render('vegetables/Show', {vegetable: vegetables[req.params.indexOfVegetablesArray]})
        // })

        app.get('/vegetables/:id', async (req, res) => {
            try{
                const vegetable = await Vegetables.findById(req.params.id)
                res.render('vegetables/Show', {vegetable})
            }catch(error){
                console.log(error)
            }
        })  

app.listen(process.env.PORT || 3000, () => {
    console.log('listening');
});