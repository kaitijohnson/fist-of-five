exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('classes', table => {
      table.increments();
      table.string('name')
        .notNullable()
      table.timestamps(true, true)

    })
  ])

};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('classes')
  ])
};
