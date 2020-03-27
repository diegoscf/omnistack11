const conexao = require('../database/conexao');

module.exports = {

    async listar (requisicao, resposta) {
        const ongId = requisicao.headers.authorization;
        return resposta.json(
            await conexao('tb_incidente').where('ong_id', ongId).select('*')
        );
    },

};