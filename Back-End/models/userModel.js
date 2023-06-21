const pool = require("../utils/db");
const bcrypt = require("bcrypt");

async function areValidCredentials(username, password) {
    try {
        var conn = await pool.getConnection();

        var sql = "SELECT psswd FROM users WHERE username = '" + username + "'";

        const rows = await conn.query(sql);
        conn.end();

        // console.log("----------------------------");
        // console.log((rows[0] == undefined));

        if (rows != null && rows[0] != undefined) {
            // if (rows[0].psswd == password) {
            if (await bcrypt.compare(password, rows[0].psswd)) {
                return true;
            } else {
                return false
            }
        }

    } catch (err) {
        throw err;
    }
}

async function getData(username) {
    try {
        var conn = await pool.getConnection();

        var sql = "SELECT id, username, role, email FROM users WHERE username = '" + username + "'";

        const rows = await conn.query(sql);
        conn.end();

        if (rows.length >= 1) {
            return rows[0];
        } else {
            return false;
        }
    } catch (err) {
        throw err;
    }
}

async function alreadyExist(username, email) {
    try {
        var conn = await pool.getConnection();

        var sql = "SELECT id FROM users WHERE username = '" + username + "'";

        const rows = await conn.query(sql);
        conn.end();

        // console.log("user lenght = " + rows.length);

        if (rows.length == 1) {
            return true;
        } else {
            var sql2 = "SELECT id FROM users WHERE email = '" + email + "'";

            const rows2 = await conn.query(sql2);
            conn.end();

            // console.log("email = " + rows2.length);

            if (rows2.length >= 1) {
                return true;
            } else {
                return false;
            }
        }
    } catch (err) {
        throw err;
    }
}

async function newUser(username, password, email) {
    try {
        var conn = await pool.getConnection();

        var sql = "INSERT INTO users (username, psswd, email) VALUES ('" + username + "', '" + password + "', '" + email + "')";

        const rows = await conn.query(sql);
        conn.end();

        if (rows) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        throw err;
    }
}

module.exports = { areValidCredentials, getData, alreadyExist, newUser };