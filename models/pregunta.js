const mongoose = require('mongoose')

const Pregunta = mongoose.model('Pregunta', {

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

module.exports = Pregunta


