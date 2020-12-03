const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const { JsonWebTokenError } = require('jsonwebtoken')

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email:{
        type: String,
        required: true,
        trim: true,
		lowercase: true,
		unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email no es válido')
            }
        }
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
        trim: true,
        minlength: 8,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Password no valido')
            }
        }
    },
    tokens: [
        {token:{
            type: String,
            required: true
        }}
    ]
})

userSchema.methods.generateAuthToken = async function() {
    const user = this
    const token = await jsonwebtoken.sign({id: user._id.toString()}, 'estoessupersecreto', {expiresIn: '7 days'})

    user.tokens = user.tokens.contact({token:token})
    await user.save()
    return token
}


userSchema.statics.findUserByCredentials = async (email,password)=>{
    const user = await User.findOne({email: email})
    if(!user){
        throw new Error('Usuario no encontrado')
    }
    const  isOk = await bcrypt.compare(password, user.password)
    if(!isOk){
        throw new Error('Email o password no validos')
    }
    return user
}


userSchema.pre('save', async function (next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    console.log('hola desde pre')
    next()
})

const User = mongoose.model('User',userSchema)

module.exports = User
