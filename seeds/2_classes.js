exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('classes').del()
    .then(function() {
      return Promise.all([
        // Inserts seed entries
        knex('classes').insert([{
          id: 1,
          name: 'G44'
        }, {
          id: 2,
          name: 'G49'
        }, {
          id: 3,
          name: 'G36'
        }, {
          id: 4,
          name: 'G32'
        }])

      ])
    }).then(() => {
      return knex.raw("SELECT setval('classes_id_seq', (SELECT MAX(id) FROM classes))")
    })
};
