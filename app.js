const express = require('express')

require('./db/mongoose')
const Pregunta = require('./models/test')
const preguntaRouter = require('./routers/test')

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
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use((req, res, next) => {
  console.log('new request made:');
  console.log('host: ', req.hostname);
  console.log('path: ', req.path);
  console.log('method: ', req.method);
  next();
});


app.get('/', async (req, res) => {
  await Pregunta.find({}).then((data) => {
      res.render('index', { preguntas: data })
  });
});
app.get('/create', (req, res) => {
  res.render('create', {  })
});

app.post('/create', (req,res) => {
  res.redirect(307, './')
})

app.use('/api', preguntaRouter);


app.use((req, res) => {
  res.status(404).render('404', {});
});