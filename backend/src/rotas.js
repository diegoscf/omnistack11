const express = require('express');
const crypto  = require('crypto');
// const conexao = require('./database/conexao');
const OngController       = require('./controllers/OngController');
const IncidenteController = require('./controllers/IncidenteController');
const PerfilController    = require('./controllers/PerfilController');
const SessaoController    = require('./controllers/SessaoController');

const rotas = express.Router();

// rotas.get('/usuarios', (requisicao, resposta) => {
//     const parametros = requisicao.query;
//     // usuarios?nome=Diego&idade=30

//     const recursos = requisicao.params;
//     //usuarios/:id

//     const corpo = requisicao.body;
//     //{"nome" : "Diego", "idade": 30}

//     console.log(parametros, recursos, corpo);
    
//     return resposta.json({
//         autor: "Diego Costa Figueiredo", 
//         prof: "Diego Fernandes"
//     });
// });

// rotas.get('/ongs', async (requisicao, resposta) => {
//     const ongs = await conexao('tb_ong').select('*');
//     return resposta.json(ongs);
// });

rotas.get('/ongs', OngController.listar);

// rotas.post('/ongs', async (requisicao, resposta) => {
//     const {nome, email, whatsapp, cidade, uf} = requisicao.body;

//     const id = crypto.randomBytes(4).toString('HEX');

//     await conexao('tb_ong').insert({
//         id, 
//         nome,
//         email,
//         whatsapp,
//         cidade,
//         uf
//     });
    
//     return resposta.json({id});
// });

rotas.post('/ongs', OngController.incluir);

rotas.get('/ong', PerfilController.listar);

rotas.get('/incidentes', IncidenteController.listar);
rotas.post('/incidentes', IncidenteController.incluir);
rotas.delete('/incidentes/:id', IncidenteController.excluir);

rotas.post('/sessao', SessaoController.criar);

module.exports = rotas;