const express = require('express');
const cors = require('cors');
const rotas = require('./rotas');

const app = express();

app.use(cors(/*{origin: 'meuapp.com'}*/));
app.use(express.json());
app.use(rotas);

app.listen(3333);