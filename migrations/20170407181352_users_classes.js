exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users_classes', table => {
      table.increments();
      table.integer('user_id')
        .references('users.id')
        .notNullable()
      table.integer('class_id')
        .references('classes.id')
        .notNullable()
    })
  ])

};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users_classes')
  ])
};
