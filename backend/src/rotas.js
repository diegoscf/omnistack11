const express = require('express');
const {celebrate, Segments, Joi} = require('celebrate');
// const crypto  = require('crypto');
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

rotas.post(
    '/ongs', 
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            nome: Joi.string().required(),
            email: Joi.string().required().email(),
            whatsapp: Joi.string().required().min(10).max(11),
            cidade: Joi.string().required(),
            uf: Joi.string().required().length(2)
        })
    }), 
    OngController.incluir
);

rotas.get(
    '/ong', 
    celebrate({
        [Segments.HEADERS]: Joi.object({
            authorization: Joi.string().required()
        }).unknown()
    }),
    PerfilController.listar
);

rotas.get(
    '/incidentes', 
    celebrate({
        [Segments.QUERY]: Joi.object({
            page: Joi.number()
        }).unknown()
    }),
    IncidenteController.listar
);
rotas.post('/incidentes', IncidenteController.incluir);
rotas.delete(
    '/incidentes/:id', 
    celebrate({
        [Segments.PARAMS]: Joi.object({
            id: Joi.number().required()
        }).unknown()
    }),
    IncidenteController.excluir
);

rotas.post('/sessao', SessaoController.criar);

module.exports = rotas;