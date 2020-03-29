const knex   = require('knex');
const config = require('../../knexfile');

const dbConfig = process.env.NODE_ENV === 'test'
    ? config.test
    : config.development; 

const conexao = knex(dbConfig);

module.exports = conexao;
