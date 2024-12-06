// module.exports = {
//     HOST: process.env.DB_HOST || "postgres",
//     USER: process.env.DB_USER || "postgres",
//     PASSWORD: process.env.DB_PASSWORD || "12345",
//     DB: process.env.DB_NAME || "WebDev-Praktek-MovieDb",
//     dialect: "postgres",
//     pool: {
//       max: 5,
//       min: 0,
//       acquire: 30000,
//       idle: 10000
//     }
//   };

module.exports = {
  HOST: process.env.DB_HOST || "postgres",
  USER: process.env.DB_USER || "postgres",
  PASSWORD: process.env.DB_PASSWORD || "12345",
  DB: process.env.DB_NAME || "WebDev-Praktek-MovieDb",
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // Railway-specific
    }
  },
  pool: {
    max: 10,
    min: 2,
    acquire: 15000,
    idle: 30000
  }
};