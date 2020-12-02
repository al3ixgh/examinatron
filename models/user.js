const mongoose = require('mongoose')
const { default: validator } = require('validator')
const { string } = require('yargs')

const User = mongoose.model('User', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: true,
        trim: true,

        validate(value){
            if(validator.value){

            }
        },
        trim: true
    },
    age: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
        enum: [],,
        match: RegExp,
        validate(value) {
            if (value<0) {
                throw new Error('Edad tiene que ser positiva')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Password no valido')
            }
        }
    }
}))

module.exports = User

/*
añadir recurso usuario:
    name
        ·required
        ·trim
    email
        ·required
        ·valido
        ·trim
    password
        ·required
        ·minimo 7 caracteres
        ·no contenga la palabra 'password'
    age.
        · default 0
        · no negativos
    */