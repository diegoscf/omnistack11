const conexao = require('../database/conexao');
const crypto  = require('crypto');

module.exports = {
    
    async listar (requisicao, resposta) {
        const ongs = await conexao('tb_ong').select('*');
        return resposta.json(ongs);
    },

    async incluir (requisicao, resposta) {
        const {nome, email, whatsapp, cidade, uf} = requisicao.body;
    
        const id = crypto.randomBytes(4).toString('HEX');
    
        await conexao('tb_ong').insert({
            id, 
            nome,
            email,
            whatsapp,
            cidade,
            uf
        });
        
        return resposta.json({id});
    }

};