const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

//Routes
const striperoutes = require('./routes/stripe-route');

require('dotenv').config();


const app = express();
const port = process.env.PORT || 3001;


// Middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));

// app.use('/api/stripe', striperoutes);

const uri = 'mongodb://127.0.0.1:27017/Fit' || process.env.MONGODB_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const exerciseRouter = require('./routes/exercise');
const userRouter = require('./routes/user');
const intakeRouter = require('./routes/intake');
const waterRouter = require('./routes/water');

// app.get('/', (req, res) => {
//   res.send('MERN Exercise Tracker');
// })

app.use('/exercise', exerciseRouter);
app.use('/user', userRouter);
app.use('/intake', intakeRouter);
app.use('/water', waterRouter);

mongoose.connection.once('open', () =>{
  console.log('Mongodb connection established')

  app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
})
});

