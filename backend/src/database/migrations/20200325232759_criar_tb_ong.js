
exports.up = function(knex) {
  return knex.schema.createTable('tb_ong', function (table) {
    table.string('id').primary(); //será gerado pela aplicação
    table.string('nome').notNullable();
    table.string('email').notNullable();
    table.string('whatsapp').notNullable();
    table.string('cidade').notNullable();
    table.string('uf', 2).notNullable();
    table.timestamps();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('tb_ong');
};
