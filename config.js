const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

const databaseConfig = {
  urlDB: process.env.MYSQL_PUBLIC_URL,

  connectToDatabase: () => {
    const db = mysql.createConnection(databaseConfig.urlDB);

    db.connect((err) => {
      if (err) {
        console.error("Error connecting to MySQL:", err.message);
      } else {
        console.log("Connected to MySQL via Railway!");
      }
    });

    return db;
  },
};

module.exports = databaseConfig;
