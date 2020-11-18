const mongoose = require('mongoose')

const Test = mongoose.model('Test', {
    pregunta:{
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    respuesta1:{
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    respuesta2:{
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    respuesta3:{
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    respuesta4:{
        type: String,
        required: true,
        trim: true,
        lowercase: true
    }
})

module.exports = Test