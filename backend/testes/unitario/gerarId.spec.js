const gerarId = require('../../src/utils/gerarId');

describe(
    'Gerar ID',
    () => {
        it(
            'deve gerar um ID único',
            () => {
                // expect(2+2).toBe(5);
                const id = gerarId();
                expect(id).toHaveLength(8);
            }
        )
    }
);