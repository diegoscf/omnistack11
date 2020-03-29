const express = require('express');
const cors = require('cors');
const rotas = require('./rotas');
const {errors} = require('celebrate');

const app = express();

app.use(cors(/*{origin: 'meuapp.com'}*/));
app.use(express.json());
app.use(rotas);
app.use(errors());

// app.listen(3333);

module.exports = app;