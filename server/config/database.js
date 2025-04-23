const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost:5432/ljudio",
  {
    dialect: "postgres",
    dialectOptions: {
      ssl:
        process.env.NODE_ENV === "production"
          ? {
              require: true,
              rejectUnauthorized: false,
            }
          : false,
    },
  }
);

module.exports = sequelize;
