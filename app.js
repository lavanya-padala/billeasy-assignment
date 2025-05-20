const express = require('express');
const userRoutes = require('./src/routes/user');
const bookRoutes=require('./src/routes/book')

const app = express();

app.use(express.json());

app.use('/', userRoutes);

app.use('/',bookRoutes);

app.get('/', (req, res) => {
  res.send({message:"API is running"});
});

module.exports = app;
