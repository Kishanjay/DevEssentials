const mysql = require('mysql');

const DATABASE_NAME = "exampledb";
const TABLE_NAME = "exampletable";

let con = null;

/**
 * Ensures that the database exists, creates it if it doesn't yet.
 */
function assertDatabase() {
    return new Promise((resolve, reject) => {
        const dbcon = mysql.createConnection({
            host: "db",
            user: "root",
            password: "admin"
        });

        dbcon.connect(function (err) {
            if (err) reject(err);
            
            dbcon.query(`CREATE DATABASE IF NOT EXISTS ${DATABASE_NAME}`, function (err, result) {
                if (err) return reject(err);
                
                resolve(result);
            });
        });
    });
}

/**
 * Ensure that the table exists, creates it if it doesn't yet.
 */
function assertTable() {
    return new Promise((resolve, reject) => {
        const sql = `CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (id INT AUTO_INCREMENT PRIMARY KEY, examplekey VARCHAR(255))`;
        con.query(sql, function (err, result) {
            if (err) return reject(err);
            resolve(result);
        });
    });
    
}

module.exports = {
    get: function () {
        return new Promise((resolve, reject) => {
            if (!con) { throw "No database connection"; }
            const sql = `SELECT * FROM ${TABLE_NAME}`;
            con.query(sql, function (err, result) {
                if (err) return reject(err);
                resolve(result);
            });
        });
    },
    insert: function (string) {
        return new Promise((resolve, reject) => {
            if (!con) { throw "No database connection"; }
            const sql = `INSERT INTO ${TABLE_NAME} (examplekey) VALUES ("${string}")`;
            con.query(sql, function (err, result) {
                if (err) return reject(err);
                console.log("1 record inserted");
    
                resolve(result);
            });
        })
    },
    /**
     * Returns a valid database connection, ensures that a database including
     * all database requirements are present.
     */
    connect: async function (callback) {
        await assertDatabase();
        con = mysql.createConnection({
            host: "db",
            user: "root",
            password: "admin",
            database: DATABASE_NAME
        });
        await assertTable(con);

        callback();
    }
}



