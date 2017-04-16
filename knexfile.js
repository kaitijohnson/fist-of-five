module.exports = {
  test: {
    client: 'pg',
    connection: 'postgres://localhost/foftest_db',
    debug:true
  },
  development: {
    client: 'pg',
    connection: 'postgres://localhost/fof_db'
  },
  production:{
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
