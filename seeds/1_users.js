exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function() {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert([{
            id: 1,
            first_name: 'Ad',
            last_name: 'Min',
            email: 'admin@admin.admin',
            hashed_password: '$2a$12$C9AYYmcLVGYlGoO4vSZTPud9ArJwbGRsJ6TUsNULzR48z8fOnTXbS', // youreawizard
            created_at: new Date('2016-06-29 14:26:16 UTC'),
            updated_at: new Date('2016-06-29 14:26:16 UTC'),
            isInstructor: true
          },
          {
            id: 2,
            first_name: 'Matthew',
            last_name: 'Albrecht',
            email: 'matt@matt.com',
            hashed_password: '$2a$12$C9AYYmcLVGYlGoO4vSZTPud9ArJwbGRsJ6TUsNULzR48z8fOnTXbS', // youreawizard
            created_at: new Date('2016-06-29 14:26:16 UTC'),
            updated_at: new Date('2016-06-29 14:26:16 UTC'),
            isInstructor: false
          },
          {
            id: 3,
            first_name: 'Kaiti',
            last_name: 'Johnson',
            email: 'kaiti@kaiti.com',
            hashed_password: '$2a$12$C9AYYmcLVGYlGoO4vSZTPud9ArJwbGRsJ6TUsNULzR48z8fOnTXbS', // youreawizard
            created_at: new Date('2016-06-29 14:26:16 UTC'),
            updated_at: new Date('2016-06-29 14:26:16 UTC'),
            isInstructor: false
          },
          {
            id: 4,
            first_name: 'Erica',
            last_name: 'Epperson',
            email: 'erica@erica.com',
            hashed_password: '$2a$12$C9AYYmcLVGYlGoO4vSZTPud9ArJwbGRsJ6TUsNULzR48z8fOnTXbS', // youreawizard
            created_at: new Date('2016-06-29 14:26:16 UTC'),
            updated_at: new Date('2016-06-29 14:26:16 UTC'),
            isInstructor: false
          },
          {
            id: 5,
            first_name: 'Sean',
            last_name: 'Kelly',
            email: 'sean@sean.com',
            hashed_password: '$2a$12$C9AYYmcLVGYlGoO4vSZTPud9ArJwbGRsJ6TUsNULzR48z8fOnTXbS', // youreawizard
            created_at: new Date('2016-06-29 14:26:16 UTC'),
            updated_at: new Date('2016-06-29 14:26:16 UTC'),
            isInstructor: false
          }
        ])

      ])
    }).then(() => {
      return knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users))")
    })
};
