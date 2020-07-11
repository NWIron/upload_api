const mysql = require('mysql');
const path = require('path');
const pool = mysql.createPool({
    host: '10.20.2.34',
    port: '3306',
    user: 'root',
    password: 'mecn2020',
    database: 'file_log'
});

const folderPath = 'C:/SAP Attachments';

module.exports = {
    file_upload_log: (req, res, next) => {
        pool.getConnection((err, connection) => {
            //Generate File Upload Logs
            if (err) {
                console.log(err);
                return
            }

            let storagePath = path.join(req.file.destination, req.file.filename)

            let addSql = 'INSERT INTO file_logs(datetime,file_name,file_path,user,action) VALUES(?,?,?,?,?)';
            let addSqlParams = [req._startTime, req.file.filename, storagePath, req.body.user, 'upload'];
            //Query With Connection
            connection.query(addSql, addSqlParams, function (error, results) {
                //Release Connection
                connection.release();

                //Error Handling
                if (error) {
                    console.log(error);
                }
                else {
                    console.log(results);
                }
            });

        });

    },

    file_delete_log: (req, res, next) => {
        pool.getConnection((err, connection) => {
            //Generate File Upload Logs
            if (err) {
                console.log(err);
                return
            }

            let keys = req.body.keys;
            let storagePath = folderPath;

            keys.forEach(key => {
                storagePath = path.join(storagePath, key);
            });

            let addSql = 'INSERT INTO file_logs(datetime,file_name,file_path,user,action) VALUES(?,?,?,?,?)';
            let addSqlParams = [req._startTime, keys[keys.length - 1], storagePath, req.body.userName, 'delete'];
            //Query With Connection
            connection.query(addSql, addSqlParams, function (error, results) {
                //Release Connection
                connection.release();

                //Error Handling
                if (error) {
                    console.log(error);
                }
                else {
                    console.log(results);
                }
            })
        });
    }
}
