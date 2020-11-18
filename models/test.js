const mongoose = require('mongoose')

const Test = mongoose.model('Test', {

    pregunta: {
        type: String,
        required: true,
    },
    respuesta1: {
        type: String,
        required: true,
    },
    respuesta2: {
        type: String,
        required: true,
    },
    respuesta3: {
        type: String,
        required: true,
    },
    respuesta4: {
        type: String,
        required: true,
    }
})

module.exports = Test


