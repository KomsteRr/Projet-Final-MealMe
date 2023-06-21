require("dotenv").config();
const mariadb = require("mariadb");

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PSSWD,
    database: process.env.DB_NAME,
});

module.exports = {
    getConnection() {
        return new Promise(function(res, rej) {
            pool.getConnection()
                .then(function(conn) {
                    res(conn);
                })
                .catch(function(error) {
                    rej(error);
                });
        });
    }
};