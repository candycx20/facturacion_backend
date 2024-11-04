
module.exports = {
    HOST: "database-1.c9s08qs0yb7v.us-east-2.rds.amazonaws.com",
    USER: "admin",
    PASSWORD: "Q3HH7DQ6",
    DB: "facturacion",
    dialect: "mysql",
    port: 3308,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
  