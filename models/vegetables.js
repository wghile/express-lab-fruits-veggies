// const vegetables = [
//     {
//         name: 'Butternut Squash',
//         color: 'orange',
//         readyToEat: true
//     },
//     {
//         name: 'Potato',
//         color: 'White',
//         readyToEat: false
//     },
//     {
//         name: 'Spinach',
//         color: 'Yellow',
//         readyToEat: false
//     },
//     {
//         name: 'Portabello Mushroom',
//         color: 'Brown',
//         readyToEat: true
//     },
//     {
//         name: 'Cabbage',
//         color: 'Purple',
//         readyToEat: true
//     }

// ]

// module.exports = vegetables

const mongoose = require('mongoose')

const vegetableSchema = new mongoose.Schema({
    name: {type: String, required: true},
    color: {type: String, required: true},
    readyToEat: Boolean
})

const Vegetables = mongoose.model('Vegetables', vegetableSchema)

module.exports = Vegetables