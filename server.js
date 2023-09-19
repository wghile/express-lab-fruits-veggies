const express = require('express');
const app = express();
const jsxEngine = require('jsx-view-engine') //declare variable requiring jsx-view-engine library

const fruits = require('./models/fruit.js')
const vegetables = require('./models/vegetables.js')

//adding our view templates
  app.set('view engine', 'jsx');
  app.engine('jsx', jsxEngine());

//routes
    //Index Route
    app.get('/fruits/', (req, res) => {
        // res.send(fruits);
        res.render('fruits/Index', {fruits: fruits})
    });

    app.get('/vegetables/', (req, res) => {
        res.render('vegetables/Index', {vegetables: vegetables})
    })

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