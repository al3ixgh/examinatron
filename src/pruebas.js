
/* { ----------- EXPRESS ----------- } */
const express = require('express');
const app = express();

/* { ----------- MODELS & ROUTERS ----------- } */
require("../db/mongoose");

const Test = require('../models/test');
const User = require('../models/user');

const testRouter = require('../routers/test');
const userRouter = require('../routers/user');

/* { ----------- PORT ----------- } */
const port = process.env.PORT || 3000

/* { ----------- APP LISTEN ----------- } */
app.listen(port, ()=>{
    console.log(`Listening to port ${port}`);
});

/* { ----------- EJS VIEW ENGINE ----------- } */
app.set('view engine', 'ejs');

/* { ----------- MIDDLEWARE ----------- } */
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use((req, res, next) => {
    console.log('new request made:');
    console.log('host: ', req.hostname);
    console.log('path: ', req.path);
    console.log('method: ', req.method);
    next();
});

/* { ----------- RUTAS WEB ----------- } */
app.get('/', async (req, res) => {
    await Test.find({}).then((data) => {
        res.render('index', { tests: data })
    });
});
app.get('/crear', (req, res) => {
    res.render('crear', {  })
});
app.get('/crearUsuario', (req, res) => {
    res.render('crearuser', {  })
});

app.get('/users/login', async(req, res) => {
    try{
        const user = User.findUserByCredentials(req.body.email, req.body.password)
        const token = user.generateAuthToken()
        
        res.send({user, token})
    }catch(error){
        res.status(404)
    }
})

/* { ----------- API ROUTING ----------- } */
// EXAMPLE: app.use('/api', modelRouter)
app.use('/api', testRouter);
app.use('/api', userRouter);

/* { ----------- EXPRESS ----------- } */
app.use((req, res) => {
    res.status(404).render('404', {});
});
