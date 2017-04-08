exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', table => {
      table.increments();
      table.string('first_name')
        .notNullable()
        .defaultTo('');
      table.string('last_name')
        .notNullable()
        .defaultTo('');
      table.string('email')
        .notNullable()
        .unique();
      table.string('profile_pic_url')
        .notNullable()
        .defaultTo('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png')
      table.boolean('isInstructor')
        .notNullable()
      table.timestamps(true, true)
      table.specificType('hashed_password', 'char(60)')
        .notNullable()
    })

  ])

};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users')
  ])
};
