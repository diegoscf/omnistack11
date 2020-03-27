const conexao = require('../database/conexao');

module.exports = {

    async criar (requisicao, resposta) {
        const {id} = requisicao.body;

        const ong = await conexao('tb_ong')
            .where('id', id)
            .select('nome')
            .first();

        if (!ong) {
            return resposta.status(400).json({ erro: `Nenhuma ONG encontrada com o ID ${id}`});
        }

        return resposta.json(ong);
    },

};