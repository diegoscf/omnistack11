const requisicaoMock = require('supertest');
const app = require('../../src/app');
const conexao = require('../../src/database/conexao');

describe(
    'Incluir ONG',
    () => {
        beforeEach(async () => {
            await conexao.migrate.rollback();
            await conexao.migrate.latest();
        });
        afterAll(async () => await conexao.destroy());

        it(
            'deve conseguir gerar um novo registro',
            async () => {
                const resposta = await requisicaoMock(app)
                .post('/ongs')
                //.set('Authorization', 'aqui serve pra setar o ID passado no header')
                .send({
                    nome: "ONG teste",
                    email: "email@teste.com",
                    whatsapp: "61999118355",
                    cidade: "Ceará",
                    uf: "CE"
                });

                expect(resposta.body).toHaveProperty('id');
                expect(resposta.body.id).toHaveLength(8);
            }
        );
    }
);