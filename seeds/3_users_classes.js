exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users_classes').del()
    .then(function() {
      return Promise.all([
        // Inserts seed entries
        knex('users_classes').insert([{
          id: 1,
          user_id: 2,
          class_id: 1
        }, {
          id: 2,
          user_id: 1,
          class_id: 1
        }, {
          id: 3,
          user_id: 3,
          class_id: 1
        }, {
          id: 4,
          user_id: 4,
          class_id: 1
        }, {
          id: 5,
          user_id: 5,
          class_id: 1
        }])

      ])
    }).then(() => {
      return knex.raw("SELECT setval('users_classes_id_seq', (SELECT MAX(id) FROM users_classes))")
    })
};
