const mongoose = require('mongoose')

const vegetableSchema = new mongoose.Schema({
    name: {type: String, required: true},
    color: {type: String, required: true},
    readyToEat: Boolean
})

const Vegetables = mongoose.model('Vegetables', vegetableSchema)

module.exports = Vegetables