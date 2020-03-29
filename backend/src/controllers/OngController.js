const conexao = require('../database/conexao');
// const crypto  = require('crypto');
const gerarId = require('../utils/gerarId');

module.exports = {
    
    async listar (requisicao, resposta) {
        const ongs = await conexao('tb_ong').select('*');
        return resposta.json(ongs);
    },

    async incluir (requisicao, resposta) {
        const {nome, email, whatsapp, cidade, uf} = requisicao.body;
    
        // const id = crypto.randomBytes(4).toString('HEX');
        const id = gerarId();
    
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