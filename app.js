const express = require('express')

require('./db/mongoose')
const Test = require('./models/test')
const testRouter = require('./routers/test')

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
  await Test.find({}).then((data) => {
      res.render('index', { test: data })
  });
});
app.get('/create', (req, res) => {
  res.render('create', {  })
});

app.post('/create', (req,res) => {
  res.redirect(307, './')
})

app.use('/api', testRouter);


app.use((req, res) => {
  res.status(404).render('404', {});
});