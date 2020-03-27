const conexao = require('../database/conexao');

module.exports = {

    async listar (requisicao, resposta) {
        
        //return resposta.json(await conexao('tb_incidente').select('*'));
        const { page = 1 } = requisicao.query;

        const [count] = await conexao('tb_incidente').count();

        const paginacao = await conexao('tb_incidente')
            .join('tb_ong', 'tb_ong.id', '=', 'tb_incidente.ong_id')
            .limit(5)
            .offset((page - 1) * 5) // page = 1 vai do 0 até o 5, page = 2, vai do 5 ao 9...
            //.select('*')
            .select([
                'tb_incidente.*', 
                'tb_ong.nome', 
                'tb_ong.email', 
                'tb_ong.whatsapp', 
                'tb_ong.cidade', 
                'tb_ong.uf',
            ]);

        resposta.header('X-Total-Count', count['count(*)']);

        return resposta.json(paginacao);
    },

    async incluir(requisicao, resposta) {
        const {titulo, desc, valor} = requisicao.body;
        const ongId = requisicao.headers.authorization;

        //const retorno = await conexao('tb_incidente').insert({
        const [id] = await conexao('tb_incidente').insert({
            titulo, 
            descricao: desc,
            valor,
            ong_id: ongId
        });

        // const id = retorno[0];

        return resposta.json({ id });
    },

    async excluir (requisicao, resposta) {

        const { id } = requisicao.params;
        const ongId = requisicao.headers.authorization;

        const incidente = await conexao('tb_incidente')
            .where('id', id)
            .select('ong_id')
            .first();

        if (!incidente) {
            return resposta.status(400).json({ erro: `Nenhum incidente encontrado com o ID ${id}`});
        }

        if (incidente.ong_id != ongId) {
            return resposta.status(401).json({ erro: 'Operação não permitida'});
        }

        await conexao('tb_incidente')
            .where('id', id)
            .delete();

        return resposta.status(204).send();
    },

};