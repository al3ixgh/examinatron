const express = require('express');
const Test = require('./models/test');
const User = require('./models/user');

require('./db/mongoose')
const testRouter = require('./routers/test')
const userRouter = require('./models/user')

const port = process.env.PORT

// express app
const app = express();

// listen for requests
app.listen(port, () => {
  console.log(`Server listening to port ${port}`)
});

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));

app.get('/', async (req, res) => {
  try{
    const tests =await Test.find({})
    res.render('index', { tests: tests, titulo: 'Home' });
  }catch (e){

  res.render('index', { tests: [], titulo: 'Índice' });
  }
});

app.get('/form', (req, res)=>{
  res.render('formulario', {titulo: 'Crear test'})
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', testRouter)

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { titulo: '404' });
});